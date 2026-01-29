import { api } from './client';

export interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    stockQuantity: number;
    createdAt?: string;
}

export type CreateProductDto = Omit<Product, 'id' | 'createdAt'>;
export type UpdateProductDto = Partial<CreateProductDto>;

export const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await api.get('/products');
    return data;
};

export const createProduct = async (product: CreateProductDto): Promise<Product> => {
    const { data } = await api.post('/products', product);
    return data;
};

export const updateProduct = async (id: number, product: UpdateProductDto): Promise<Product> => {
    const { data } = await api.patch(`/products/${id}`, product);
    return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
};
