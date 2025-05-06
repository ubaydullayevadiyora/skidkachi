import {
  
  Injectable,

} from "@nestjs/common";
import { CreateSocialMediaTypeDto } from "./dto/create-social-media-type.dto";
import { UpdateSocialMediaTypeDto } from "./dto/update-social-media-type.dto";
import { InjectModel } from "@nestjs/sequelize";
import { SocialMediaType } from "./models/socialMediaType.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class SocialMediaTypesService {
  constructor(
    @InjectModel(SocialMediaType) private readonly socialMediaTypeModel: typeof SocialMediaType
  ) {}
  async create(createSocialMediaTypeDto: CreateSocialMediaTypeDto) {
    const newSocialMediaType = await this.socialMediaTypeModel.create({...createSocialMediaTypeDto})
    return newSocialMediaType;
  }
    
  findAll() {
    return `This action returns all socialMediaTypes`;
  }

  async findOne(id: number): Promise<SocialMediaType | null> {
    return this.socialMediaTypeModel.findByPk(id);
  }

  update(id: number, updateSocialMediaTypeDto: UpdateSocialMediaTypeDto) {
    return `This action updates a #${id} socialMediaType`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialMediaType`;
  }
}
