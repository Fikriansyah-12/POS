import { PartialType } from "@nestjs/mapped-types";
import { categoryDto } from "./create-category.dto";

export class updateCategoryDto extends PartialType(categoryDto){}