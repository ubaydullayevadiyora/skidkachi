import { Injectable } from "@nestjs/common";
import { CreateDiscountDto } from "./dto/create-discounts.dto";
import { UpdateDiscountDto } from "./dto/update-discounts.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Discounts } from "./models/discounts.model";

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discounts) private readonly discountsModel: typeof Discounts
  ) {}
  async create(createDiscountDto: CreateDiscountDto) {
    const newDiscount = await this.discountsModel.create({ ...createDiscountDto });
    return newDiscount;
  }

  findAll() {
    return `This action returns all discountss`;
  }

  async findOne(id: number): Promise<Discounts | null> {
    return this.discountsModel.findByPk(id);
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discounts`;
  }

  remove(id: number) {
    return `This action removes a #${id} discounts`;
  }
}
