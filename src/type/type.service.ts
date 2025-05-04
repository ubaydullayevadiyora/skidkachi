import { Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Type } from "./models/type.model";

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type) private readonly typeModel: typeof Type) {}
  async create(createTypeDto: CreateTypeDto) {
    const newType = await this.typeModel.create({ ...createTypeDto });
    return newType;
  }

  findAll() {
    return `This action returns all types`;
  }

  async findOne(id: number): Promise<Type | null> {
    return this.typeModel.findByPk(id);
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
