import { IsEmail, IsMobilePhone, IsOptional, IsString } from "class-validator";

export class customerDto{

  @IsString()
  name:string

  @IsEmail()
  @IsOptional()
  email: string

  @IsMobilePhone('id-ID')
  noHp: string
}