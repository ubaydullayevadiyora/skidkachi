import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SocialMediaTypesService } from "./socialMediaType.service";
import { CreateSocialMediaTypeDto } from "./dto/create-social-media-type.dto";
import { UpdateSocialMediaTypeDto } from "./dto/update-social-media-type.dto";

@Controller("socialMediaTypes")
export class SocialMediaTypesController {
  constructor(private readonly socialMediaTypesService: SocialMediaTypesService) {}

  @Post()
  create(@Body() createSocialMediaTypeDto: CreateSocialMediaTypeDto) {
    return this.socialMediaTypesService.create(createSocialMediaTypeDto);
  }

  @Get()
  findAll() {
    return this.socialMediaTypesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.socialMediaTypesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSocialMediaTypeDto: UpdateSocialMediaTypeDto) {
    return this.socialMediaTypesService.update(+id, updateSocialMediaTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.socialMediaTypesService.remove(+id);
  }
}
