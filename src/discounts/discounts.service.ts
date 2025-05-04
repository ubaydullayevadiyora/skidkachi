import { Injectable } from "@nestjs/common";
import { CreateDiscountDto } from "./dto/create-discounts.dto";
import { UpdateDiscountDto } from "./dto/update-discounts.dto";
import { Discount } from "./models/discounts.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount) private readonly discountsModel: typeof Discount
  ) {}
  async create(createDiscountDto: CreateDiscountDto) {
    const newDiscount = await this.discountsModel.create({ ...createDiscountDto });
    return newDiscount;
  }

  findAll() {
    return `This action returns all discountss`;
  }

  async findOne(id: number): Promise<Discount | null> {
    return this.discountsModel.findByPk(id);
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discounts`;
  }

  remove(id: number) {
    return `This action removes a #${id} discounts`;
  }
}
