import { Module } from "@nestjs/common";
import { CategorysService } from "./category.service";
import { CategorysController } from "./category.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "./models/category.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([Category]), MailModule],
  controllers: [CategorysController],
  providers: [CategorysService],
  exports: [CategorysService],
})
export class CategorysModule {}
