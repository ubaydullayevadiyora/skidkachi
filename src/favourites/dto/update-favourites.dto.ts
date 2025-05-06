import { PartialType } from "@nestjs/swagger";
import { CreateFavouritesDto } from "./create-favourites.dto";

export class UpdateFavouritesDto extends PartialType(CreateFavouritesDto) {}
