import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class supplierDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty({message: 'email tidak boleh kosong'})
  @IsEmail()
  email: string

  @IsPhoneNumber('ID')
  @IsNotEmpty()
  no_hp: string
}
