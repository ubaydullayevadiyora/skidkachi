import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminsModule } from "../../admins/admins.module";
import { AuthAdminService } from "./auth.service";

@Module({
  imports: [JwtModule.register({ global: true }), AdminsModule],
  controllers: [AuthController],
  providers: [AuthAdminService],
})
export class AuthModule {}
