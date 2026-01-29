import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
    constructor(
        private prisma: PrismaService,
        private productsService: ProductsService,
    ) { }

    async create(dto: CreateSaleDto) {
        const sale = await this.prisma.$transaction(async (tx) => {
            // 1. Fetch Product
            const product = await tx.product.findUnique({
                where: { id: dto.productId },
            });

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            // 2. Check Stock
            if (product.stockQuantity < dto.quantity) {
                throw new BadRequestException(`Insufficient stock. Available: ${product.stockQuantity}`);
            }

            // 3. Deduct Stock
            await tx.product.update({
                where: { id: dto.productId },
                data: { stockQuantity: product.stockQuantity - dto.quantity },
            });

            // 4. Create Sale
            // Using Decimal for accuracy, but JS number for simplicity here as Prisma handles conversion
            const totalPrice = Number(product.price) * dto.quantity;

            return tx.sale.create({
                data: {
                    productId: dto.productId,
                    quantity: dto.quantity,
                    totalPrice: totalPrice,
                },
            });
        });

        // Invalidate products cache since stock changed
        await this.productsService.invalidateCache();

        return sale;
    }

    async findAll() {
        return this.prisma.sale.findMany({
            include: { product: true },
            orderBy: { createdAt: 'desc' },
        });
    }
}
