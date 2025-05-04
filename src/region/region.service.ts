import { Injectable } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./models/region.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}
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
