import { PartialType } from "@nestjs/mapped-types";
import { supplierDto } from "./create-supplier.dto";

export class updateSupplierDto extends PartialType(supplierDto){}