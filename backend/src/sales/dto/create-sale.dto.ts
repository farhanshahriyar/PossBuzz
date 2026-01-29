import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateSaleDto {
    @IsNotEmpty()
    @IsInt()
    productId: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number;
}
