import { Module } from "@nestjs/common";
import { TypesService } from "./type.service";
import { TypesController } from "./type.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Type } from "./models/type.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([Type]), MailModule],
  controllers: [TypesController],
  providers: [TypesService],
  exports: [TypesService],
})
export class TypesModule {}
