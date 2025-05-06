import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { CreateReviewsDto } from "./dto/create-reviews.dto";
import { UpdateReviewsDto } from "./dto/update-reviews.dto";
import { ReviewsService } from "./reviews.service";

@Controller("Reviews")
export class ReviewsController {
  constructor(private readonly ReviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewsDto: CreateReviewsDto) {
    return this.ReviewsService.create(createReviewsDto);
  }

  @Get()
  findAll() {
    return this.ReviewsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ReviewsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateReviewsDto: UpdateReviewsDto) {
    return this.ReviewsService.update(+id, updateReviewsDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ReviewsService.remove(+id);
  }
}
