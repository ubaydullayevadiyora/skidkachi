import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Favourites } from "./models/favourites.model";
import { CreateFavouritesDto } from "./dto/create-favourites.dto";
import { UpdateFavouritesDto } from "./dto/update-favourites.dto";

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel(Favourites) private readonly favouritesModel: typeof Favourites
  ) {}
  async create(createFavouriteDto: CreateFavouritesDto) {
    const newFavourite = await this.favouritesModel.create({ ...createFavouriteDto });
    return newFavourite;
  }

  findAll() {
    return `This action returns all favouritess`;
  }

  async findOne(id: number): Promise<Favourites | null> {
    return this.favouritesModel.findByPk(id);
  }

  update(id: number, updateFavouriteDto: UpdateFavouritesDto) {
    return `This action updates a #${id} favourites`;
  }

  remove(id: number) {
    return `This action removes a #${id} favourites`;
  }
}
