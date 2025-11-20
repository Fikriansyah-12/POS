import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class findOneParams{
    
    @IsNotEmpty()
    @IsNumber()
    id: number
}