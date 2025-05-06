import { Module } from "@nestjs/common";
import { SocialMediaTypesService } from "./socialMediaType.service";
import { SocialMediaTypesController } from "./socialMediaType.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { SocialMediaType } from "./models/socialMediaType.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([SocialMediaType]), MailModule],
  controllers: [SocialMediaTypesController],
  providers: [SocialMediaTypesService],
  exports: [SocialMediaTypesService],
})
export class SocialMediaTypesModule {}
