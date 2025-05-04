import { PartialType } from "@nestjs/swagger";
import { CreateDiscountDto } from "./create-discounts.dto";

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {}
