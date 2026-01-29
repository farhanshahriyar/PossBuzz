import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSales, createSale } from '../api/sales';
import type { CreateSaleDto } from '../api/sales';
import { message } from 'antd';

export const useSales = () => {
    return useQuery({
        queryKey: ['sales'],
        queryFn: fetchSales,
    });
};

export const useCreateSale = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSale: CreateSaleDto) => createSale(newSale),
        onSuccess: () => {
            message.success('Sale processed successfully');
            queryClient.invalidateQueries({ queryKey: ['sales'] });
            // Invalidate products to update stock display
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || 'Failed to process sale');
        },
    });
};
