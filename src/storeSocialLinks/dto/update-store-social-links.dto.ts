import { PartialType } from "@nestjs/swagger";
import { CreateStoreSocialLinksDto } from "./create-store-social-links.dto";

export class UpdateStoreSocialLinksDto extends PartialType(
  CreateStoreSocialLinksDto
) {}
