import { api } from './client';
import type { Product } from './products';

export interface Sale {
    id: number;
    productId: number;
    quantity: number;
    totalPrice: number;
    createdAt: string;
    product?: Product;
}

export interface CreateSaleDto {
    productId: number;
    quantity: number;
}

export const fetchSales = async (): Promise<Sale[]> => {
    const { data } = await api.get('/sales');
    return data;
};

export const createSale = async (sale: CreateSaleDto): Promise<Sale> => {
    const { data } = await api.post('/sales', sale);
    return data;
};
