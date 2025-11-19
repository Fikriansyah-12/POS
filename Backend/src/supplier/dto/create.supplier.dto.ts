import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class supplierDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  no_hp: string
}
