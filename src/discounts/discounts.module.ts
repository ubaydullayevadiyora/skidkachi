import { Module } from "@nestjs/common";
import { DiscountsService } from "./discounts.service";
import { DiscountsController } from "./discounts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Discounts } from "./models/discounts.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([Discounts]), MailModule],
  controllers: [DiscountsController],
  providers: [DiscountsService],
  exports: [DiscountsService],
})
export class DiscountsModule {}
