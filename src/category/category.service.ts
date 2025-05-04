import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./models/category.model";

@Injectable()
export class CategorysService {
  constructor(
    @InjectModel(Category) private readonly typeModel: typeof Category
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.typeModel.create({ ...createCategoryDto });
    return newCategory;
  }

  findAll() {
    return `This action returns all types`;
  }

  async findOne(id: number): Promise<Category | null> {
    return this.typeModel.findByPk(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
