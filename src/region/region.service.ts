import { Injectable } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-district.dto";
import { UpdateRegionDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "./models/region.model";

@Injectable()
export class RegionsService {
  constructor(@InjectModel(Region) private readonly regionModel: typeof Region) {}
  async create(createRegionDto: CreateRegionDto) {
    const newRegion = await this.regionModel.create({ ...createRegionDto });
    return newRegion;
  }

  findAll() {
    return `This action returns all regions`;
  }

  async findOne(id: number): Promise<Region | null> {
    return this.regionModel.findByPk(id);
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
