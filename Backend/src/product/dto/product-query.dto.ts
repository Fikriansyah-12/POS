import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class productQueryDto{

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    id: number

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    @Min(1)
    page?: number = 1

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    @Min(1)
    limit?: number = 10

    @IsOptional()
    sortBy?: string

    @IsOptional()
    @IsIn(['asc','desc'])
    sortOrder?: 'asc' | 'desc'
}