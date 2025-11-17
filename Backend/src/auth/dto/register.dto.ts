import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { Role } from "src/enum/role.enum";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/[A-Z]/,{
        message: "Password minimal ada 1 huruf kapital"
    })
     @Matches(/[0-9]/,{
        message: " Password minimal ada 1 angka "
    })
     @Matches(/[^A-Za-z0-9]/,{
        message: " Password minimal ada 1 karakter spesial"
    })
    password: string

    @IsEnum(Role)
    @IsOptional()
    role: Role
}