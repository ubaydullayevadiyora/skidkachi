import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly mailService: MailService
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { hashed_password } = createAdminDto;
    const hashedPassword = await bcrypt.hash(hashed_password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password: hashedPassword,
    });

    try {
      await this.mailService.sendAdminMail(newAdmin);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Email yuborishda xatolik!");
    }

    return newAdmin;
  }

  findAll() {
    return `This action returns all admins`;
  }

  findAdminByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<Admin | null> {
    return this.adminModel.findByPk(id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async activateAdmin(id: number) {
    const [count, updatedAdmins] = await this.adminModel.update(
      { is_active: true },
      {
        where: {
          id,
          is_active: false,
        },
        returning: true,
      }
    );

    const activatedAdmin = updatedAdmins[0];
    if (!activatedAdmin) {
      throw new BadRequestException(
        "Admin allaqachon aktivlangan yoki topilmadi"
      );
    }

    return {
      message: "Admin muvaffaqiyatli aktivlashtirildi",
      is_active: activatedAdmin.is_active,
    };
  }
}
