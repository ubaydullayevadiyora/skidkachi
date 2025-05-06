import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { CreateFavouritesDto } from "./dto/create-favourites.dto";
import { UpdateFavouritesDto } from "./dto/update-favourites.dto";


@Controller("favourites")
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post()
  create(@Body() createFavouriteDto: CreateFavouritesDto) {
    return this.favouritesService.create(createFavouriteDto);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.favouritesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFavouriteDto: UpdateFavouritesDto) {
    return this.favouritesService.update(+id, updateFavouriteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.favouritesService.remove(+id);
  }
}
