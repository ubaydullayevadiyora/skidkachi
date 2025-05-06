import { Injectable } from "@nestjs/common";
import { CreateReviewsDto } from "./dto/create-reviews.dto";
import { UpdateReviewsDto } from "./dto/update-reviews.dto";
import { Reviews } from "./models/reviews.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews) private readonly regionModel: typeof Reviews
  ) {}
  async create(createReviewsDto: CreateReviewsDto) {
    const newReviews = await this.regionModel.create({ ...createReviewsDto });
    return newReviews;
  }

  findAll() {
    return `This action returns all regions`;
  }

  async findOne(id: number): Promise<Reviews | null> {
    return this.regionModel.findByPk(id);
  }

  update(id: number, updateReviewsDto: UpdateReviewsDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
