import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategorysService } from "./category.service";

@Controller("type")
export class CategorysController {
  constructor(private readonly typeService: CategorysService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.typeService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.typeService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.typeService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.typeService.remove(+id);
  }
}
