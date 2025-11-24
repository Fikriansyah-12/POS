import { IsString } from "class-validator";

export class createPaymentDto{

    @IsString()
    nameMetode: string

    @IsString()
    Keterangan: string

}