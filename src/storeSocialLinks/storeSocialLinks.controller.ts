import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateStoreSocialLinksDto } from "./dto/create-store-social-links.dto";
import { UpdateStoreSocialLinksDto } from "./dto/update-store-social-links.dto";
import { StoreSocialLinkssService } from "./storeSocialLinks.service";

@Controller("storeSocialLinks")
export class StoreSocialLinksController {
  constructor(private readonly storeSocialLinksService: StoreSocialLinkssService) {}

  @Post()
  create(@Body() createStoreSocialLinksDto: CreateStoreSocialLinksDto) {
    return this.storeSocialLinksService.create(createStoreSocialLinksDto);
  }

  @Get()
  findAll() {
    return this.storeSocialLinksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.storeSocialLinksService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateStoreSocialLinksDto: UpdateStoreSocialLinksDto
  ) {
    return this.storeSocialLinksService.update(+id, updateStoreSocialLinksDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.storeSocialLinksService.remove(+id);
  }
}
