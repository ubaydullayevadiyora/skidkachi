import { PartialType } from "@nestjs/swagger";
import { CreateRegionDto } from "./create-district.dto";

export class UpdateRegionDto extends PartialType(CreateRegionDto) {}
