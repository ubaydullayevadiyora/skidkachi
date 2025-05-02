import { Module } from "@nestjs/common";
import { RegionsService } from "./region.service";
import { RegionsController } from "./region.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Region } from "./models/region.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([Region]), MailModule],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
