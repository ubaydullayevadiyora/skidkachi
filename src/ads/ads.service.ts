import { Injectable } from "@nestjs/common";
import { CreateAdsDto } from "./dto/create-ads.dto";
import { UpdateAdsDto } from "./dto/update-ads.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Ads } from "./models/ads.model";

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ads) private readonly adsModel: typeof Ads) {}
  async create(createAdsDto: CreateAdsDto) {
    const newAds = await this.adsModel.create({ ...createAdsDto });
    return newAds;
  }

  findAll() {
    return `This action returns all adss`;
  }

  async findOne(id: number): Promise<Ads | null> {
    return this.adsModel.findByPk(id);
  }

  update(id: number, updateAdsDto: UpdateAdsDto) {
    return `This action updates a #${id} ads`;
  }

  remove(id: number) {
    return `This action removes a #${id} ads`;
  }
}
