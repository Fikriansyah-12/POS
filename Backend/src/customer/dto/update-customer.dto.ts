import { PartialType } from "@nestjs/mapped-types";
import { customerDto } from "./create-customer.dto";

export class updateCustomerDto extends PartialType(customerDto){}