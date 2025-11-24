import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class customerQueryDto{

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    @Min(1)
    page?: number = 1

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    @Min(1)
    limit?: number = 3

    @IsOptional()
    @IsIn(['name','createdAt'])
    sortBy?: string = 'createdAt'

    @IsOptional()
    @IsIn(['asc','desc'])
    sortOrder?: 'asc' | 'desc' = 'asc'
}