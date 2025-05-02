import {
  
  Injectable,

} from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Store } from "./models/store.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store) private readonly storeModel: typeof Store
  ) {}
  async create(createStoreDto: CreateStoreDto) {
    const newStore = await this.storeModel.create({...createStoreDto})
    return newStore;
  }
    
  findAll() {
    return `This action returns all stores`;
  }

  async findOne(id: number): Promise<Store | null> {
    return this.storeModel.findByPk(id);
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
