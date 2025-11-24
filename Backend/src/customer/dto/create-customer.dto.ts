import { IsEmail, IsMobilePhone, IsOptional, IsString } from "class-validator";

export class customerDto{

  @IsString()
  @IsOptional()
  name:string

  @IsEmail()
  @IsOptional()
  email: string

  @IsMobilePhone('id-ID')
  @IsOptional()
  noHp: string
}