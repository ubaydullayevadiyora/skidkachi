import { Module } from "@nestjs/common";
import { StoresService } from "./store.service";
import { StoresController } from "./store.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Store } from "./models/store.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([Store]), MailModule],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}
