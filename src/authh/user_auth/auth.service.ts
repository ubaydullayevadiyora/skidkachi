import { SignInDto } from "./dto/sign-in.dto";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { UsersService } from "../../users/users.service";
import { User } from "../../users/models/user.model";
import { CreateUserDto } from "../../users/dto/create-user.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accesToken,
      refreshToken,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday emailli foydalanuvchi mavjud");
    }

    const newUser = await this.usersService.create(createUserDto);
    return { message: "foydalanuvchi qo'shildi", userId: newUser.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException("Email yoki Password notori");
    }

    if (!user.is_active) {
      throw new BadRequestException("Avval emailni tasdiqlang!");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki Password notori");
    }

    const { accesToken, refreshToken } = await this.generateTokens(user);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    return {
      message: "Tizimga xush kelibsiz",
      accesToken,
    };
  }

  //sign out

  async signOut(userId: number, res: Response) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException("Foydalanuvchi topilmadi");
    }

    user.hashed_refresh_token = null;
    await user.save();

    res.clearCookie("refresh_token");

    return {
      message: "Foydalanuvchi tizimdan chiqdi",
    };
  }

  //refresh token

  async refreshToken(refresh_token: string, res: Response) {
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Refresh token notori yoki eskirgan");
    }

    const user = await this.usersService.findOne(payload.id);
    if (!user || !user.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token mavjud emas"
      );
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Refresh token mos emas");
    }

    const { accesToken, refreshToken: newRefreshToken } =
      await this.generateTokens(user);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    user.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await user.save();

    return {
      message: "Tokenlar yangilandi",
      accesToken,
    };
  }
}
