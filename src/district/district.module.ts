import { Module } from "@nestjs/common";
import { DistrictsService } from "./district.service";
import { DistrictsController } from "./district.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MailModule } from "../mail/mail.module";
import { District } from "./models/district.model";

@Module({
  imports: [SequelizeModule.forFeature([District]), MailModule],
  controllers: [DistrictsController],
  providers: [DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
