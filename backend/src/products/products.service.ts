import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

const PRODUCTS_CACHE_KEY = 'products:all';
const CACHE_TTL = 300; // 5 minutes

@Injectable()
export class ProductsService {
    constructor(
        private prisma: PrismaService,
        private redis: RedisService,
    ) { }

    async create(dto: CreateProductDto) {
        // Check if SKU exists
        const existing = await this.prisma.product.findUnique({
            where: { sku: dto.sku },
        });
        if (existing) {
            throw new ConflictException(`Product with SKU ${dto.sku} already exists`);
        }

        const product = await this.prisma.product.create({
            data: {
                name: dto.name,
                sku: dto.sku,
                price: dto.price,
                stockQuantity: dto.stockQuantity,
            },
        });

        // Invalidate cache
        await this.redis.del(PRODUCTS_CACHE_KEY);

        return product;
    }

    async findAll() {
        // Try cache first
        const cached = await this.redis.get(PRODUCTS_CACHE_KEY);
        if (cached) {
            return cached;
        }

        const products = await this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Store in cache
        await this.redis.set(PRODUCTS_CACHE_KEY, products, CACHE_TTL);

        return products;
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async update(id: number, dto: UpdateProductDto) {
        await this.findOne(id); // Ensure exists
        const product = await this.prisma.product.update({
            where: { id },
            data: dto,
        });

        // Invalidate cache
        await this.redis.del(PRODUCTS_CACHE_KEY);

        return product;
    }

    async remove(id: number) {
        await this.findOne(id); // Ensure exists
        const product = await this.prisma.product.delete({
            where: { id },
        });

        // Invalidate cache
        await this.redis.del(PRODUCTS_CACHE_KEY);

        return product;
    }

    // Called by SalesService to invalidate cache when stock changes
    async invalidateCache() {
        await this.redis.del(PRODUCTS_CACHE_KEY);
    }
}
