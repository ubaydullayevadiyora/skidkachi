import { Phone } from "nestjs-telegraf";
import { PhoneUserDto } from "./dto/phone-user.dto";
import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import * as otpGenerator from "otp-generator";
import { BotService } from "../bot/bot.service";
import * as uuid from "uuid";
import { Otp } from "./models/otp.model";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { timestamp } from "rxjs";
import { decode, encode } from "../common/helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly mailService: MailService,
    private readonly botService: BotService,
    @InjectModel(Otp) private readonly otpModel: typeof Otp
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { hashed_password, ...otherData } = createUserDto;

    if (!hashed_password) {
      throw new BadRequestException("Parol kiritilmagan");
    }

    const hashedPassword = await bcrypt.hash(hashed_password, 7);

    const newUser = await this.userModel.create({
      ...otherData,
      hashed_password: hashedPassword,
    });

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Email yuborishda xatolik");
    }

    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation is not found");
    }
    const updateUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updateUser[1][0]) {
      throw new BadRequestException("User already activated");
    }
    return {
      message: "User activated succesfully!",
      is_active: updateUser[1][0].is_active,
    };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updateUser = await this.userModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    return updateUser;
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // ____________________________  bot ____________________________
    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("AvvAl botdan ro'yxatdan o'ting!");
    }
    // return { message: "OTP botga yuborildi." };

    // sms

    //_____________________________ email ___________________________

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const newOtpData = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpData.id,
    };
    const encodedData = await encode(JSON.stringify(details));
    return {
      message: "Otp botga yuborildi",
      verification_key: encodedData,
    };
  }

  async VerifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, phone: phone_number, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);
    if (details.phone_number != phone_number) {
      throw new BadRequestException("OTP bu telefon ");
    }

    const resultOtp = await this.otpModel.findByPk(details.otp_id);

    if (resultOtp == null) {
      throw new BadRequestException("OTP yo'q ");
    }

    if (resultOtp.verified) {
      throw new BadRequestException("OTP avval tekshirilgan ");
    }

    if (resultOtp.expiration_time < currentDate) {
      throw new BadRequestException("OTP vaqti tugagan ");
    }

    if (resultOtp.otp != otp) {
      throw new BadRequestException("OTP mos emas");
    }

    const user = await this.userModel.update(
      {
        is_owner: true,
      },
      {
        where: {
          phone: phone_number,
        },
        returning: true,
      }
    );

    if (!user[1][0]) {
      throw new BadRequestException("Bunday raqamli foydalanuvchi yo'q");
    }

    await this.otpModel.update(
      { verified: true },
      { where: { id: details.otp_id } }
    );
    return {
      message: "Tabriklaymiz, siz owner bo'ldingiz",
    };
  }
}
