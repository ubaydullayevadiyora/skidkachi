import { Module } from "@nestjs/common";
import { StoreSocialLinksController } from "./storeSocialLinks.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MailModule } from "../mail/mail.module";
import { storeSocialLinks } from "./models/storeSocialLinks.model";
import { StoreSocialLinkssService } from "./storeSocialLinks.service";

@Module({
  imports: [SequelizeModule.forFeature([storeSocialLinks]), MailModule],
  controllers: [StoreSocialLinksController],
  providers: [StoreSocialLinkssService],
  exports: [StoreSocialLinkssService],
})
export class StoreSocialLinksModule {}
