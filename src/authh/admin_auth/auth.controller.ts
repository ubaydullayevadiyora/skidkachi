import { Body, Controller, Post, Res } from "@nestjs/common";

import { Response } from "express";

import { AuthAdminService } from "./auth.service";
import { SignInAdminDto } from "./dto/sign-in.dto";
import { CreateAdminDto } from "../../admins/dto/create-admin.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthAdminService) {}

  @Post("sign-in")
  async signIn(
    @Body() singInDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(singInDto, res);
  }
}
