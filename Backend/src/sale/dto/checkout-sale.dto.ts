import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, ValidateNested } from "class-validator";

class CheckoutItemDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsInt()
  @IsOptional()
  diskon_item?: number; 
}

export class CheckoutSaleDto {
  @IsOptional()
  @IsInt()
  customerId? : number

  @IsInt()
  @IsNotEmpty()
  metodePembayaranId: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}