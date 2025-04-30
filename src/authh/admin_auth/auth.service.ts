import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { AdminsService } from "../../admins/admins.service";
import { Admin } from "../../admins/models/admin.model";
import { SignInAdminDto } from "./dto/sign-in.dto";

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signIn(signInDto: SignInAdminDto, res: Response) {
    const admin = await this.adminsService.findAdminByEmail(signInDto.email);
    if (!admin) {
      throw new BadRequestException("Email yoki parol noto‘g‘ri");
    }

    if (!admin.is_active) {
      throw new BadRequestException("Admin hali faollashtirilmagan");
    }

    const isMatch = await bcrypt.compare(
      signInDto.password,
      admin.hashed_password
    );

    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol noto‘g‘ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    return {
      message: "Admin tizimga kirdi",
      accessToken,
    };
  }

  async signOut(adminId: number, res: Response) {
    const admin = await this.adminsService.findOne(adminId);
    if (!admin) throw new BadRequestException("Admin topilmadi");

    admin.hashed_refresh_token = null;
    await admin.save();

    res.clearCookie("refresh_token");

    return { message: "Admin tizimdan chiqdi" };
  }

  async refreshToken(refresh_token: string, res: Response) {
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token mavjud emas");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki eskirgan");
    }

    const admin = await this.adminsService.findOne(payload.id);
    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException("Token yoki admin topilmadi");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(admin);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    admin.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await admin.save();

    return {
      message: "Tokenlar yangilandi",
      accessToken,
    };
  }
}
