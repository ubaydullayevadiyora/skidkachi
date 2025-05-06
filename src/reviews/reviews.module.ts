import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Reviews } from "./models/reviews.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([Reviews]), MailModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
