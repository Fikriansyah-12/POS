import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class createProductDto{

  @IsString()
  @IsNotEmpty({message: 'nama product tidak boleh kosong'})
  name: string

  @Type(()=> Number)
  @IsInt()
  @Min(0)
  @IsNotEmpty({message: 'harga beli tidak boleh kosong'})
  harga_beli: number

  @Type(()=> Number)
  @IsInt()
  @Min(0)
  @IsNotEmpty({message: 'harga jual tidak boleh kosong'})
  harga_jual: number

  @IsString()
  @IsOptional()
  sku?: string

  @IsInt()
  @Type(()=> Number)
  @IsNotEmpty({message: 'stock tidak boleh kosog'})
  stock: number

  @IsString()
  @IsNotEmpty({message: 'satuan tidak boleh kosong'})
  satuan: string

  @IsOptional()
  @IsDateString()
  expiredAt?: string;

  @IsInt()
    @Type(()=> Number)
  categoryId: number;

  @IsOptional()
  @IsInt()
    @Type(()=> Number)

  supplierId?: number;

  
}