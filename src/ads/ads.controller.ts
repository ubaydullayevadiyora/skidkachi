import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdsService } from "./ads.service";
import { CreateAdsDto } from "./dto/create-ads.dto";
import { UpdateAdsDto } from "./dto/update-ads.dto";

@Controller("ads")
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  create(@Body() createAdsDto: CreateAdsDto) {
    return this.adsService.create(createAdsDto);
  }

  @Get()
  findAll() {
    return this.adsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdsDto: UpdateAdsDto) {
    return this.adsService.update(+id, updateAdsDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adsService.remove(+id);
  }
}
