import { SignInDto } from "./dto/sign-in.dto";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
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

  // sign out ________________________________________________________

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    const hashed_refresh_token = null;
    await this.usersService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };
    return response;
  }

  // refresh token ___________________________________________________________________

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("ruxsat etilmagan");
    }

    const user = await this.usersService.findOne(userId);
    if (!user || !user.hashed_refresh_token) {
      throw new NotFoundException("user not found");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Refresh token mos emas");
    }

    const { accesToken, refreshToken } = await this.generateTokens(user);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    const response = {
      message: "user refreshed",
      userId: user.id,
      acces_token: accesToken,
    };

    return response;
  }
}
