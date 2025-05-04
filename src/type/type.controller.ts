import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { TypesService } from "./type.service";

@Controller("type")
export class TypesController {
  constructor(private readonly typeService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
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
  update(@Param("id") id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typeService.update(+id, updateTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.typeService.remove(+id);
  }
}
