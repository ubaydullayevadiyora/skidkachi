import { Module } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { FavouritesController } from "./favourites.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MailModule } from "../mail/mail.module";
import { Favourites } from "./models/favourites.model";

@Module({
  imports: [SequelizeModule.forFeature([Favourites]), MailModule],
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
})
export class FavouritesModule {}
