import { Injectable } from "@nestjs/common";
import { CreateStoreSocialLinksDto } from "./dto/create-store-social-links.dto";
import { UpdateStoreSocialLinksDto } from "./dto/update-store-social-links.dto";
import { InjectModel } from "@nestjs/sequelize";
import { storeSocialLinks } from "./models/storeSocialLinks.model";

@Injectable()
export class StoreSocialLinkssService {
  constructor(
    @InjectModel(storeSocialLinks)
    private readonly StoreSocialLinksModel: typeof storeSocialLinks
  ) {}
  async create(createStoreSocialLinksDto: CreateStoreSocialLinksDto) {
    const newStoreSocialLinks = await this.StoreSocialLinksModel.create({
      ...createStoreSocialLinksDto,
    });
    return newStoreSocialLinks;
  }

  findAll() {
    return `This action returns all StoreSocialLinkss`;
  }

  async findOne(id: number): Promise<storeSocialLinks | null> {
    return this.StoreSocialLinksModel.findByPk(id);
  }

  update(id: number, updateStoreSocialLinksDto: UpdateStoreSocialLinksDto) {
    return `This action updates a #${id} StoreSocialLinks`;
  }

  remove(id: number) {
    return `This action removes a #${id} StoreSocialLinks`;
  }
}
