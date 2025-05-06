import { Module } from "@nestjs/common";
import { AdsService } from "./ads.service";
import { AdsController } from "./ads.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Ads } from "./models/ads.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([Ads]), MailModule],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [AdsService],
})
export class AdssModule {}
