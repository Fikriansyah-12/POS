import { PartialType } from "@nestjs/mapped-types";
import { createPaymentDto } from "./create-payment.dto";

export class updatePayment extends PartialType(createPaymentDto){}