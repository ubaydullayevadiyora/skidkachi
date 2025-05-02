import { Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./models/district.model";

@Injectable()
export class DistrictsService {
  constructor(@InjectModel(District) private readonly districtModel: typeof District) {}
  async create(createDistrictDto: CreateDistrictDto) {
    const newDistrict = await this.districtModel.create({ ...createDistrictDto });
    return newDistrict;
  }

  findAll() {
    return `This action returns all districts`;
  }

  async findOne(id: number): Promise<District | null> {
    return this.districtModel.findByPk(id);
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
