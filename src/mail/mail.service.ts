import { User } from "./../users/models/user.model";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Admin } from "../admins/models/admin.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.API_URL}/api/users/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to Skidkachi App!",
      template: "./confirmation",
      context: {
        name: user.name,
        url,
      },
    });
  }

  // adminlar uchun
  async sendAdminMail(admin: Admin) {
    await this.mailerService.sendMail({
      to: admin.email,
      subject: "Welcome to Skidkachi Admin Panel!",
      template: "./confirmation",
      context: {
        name: admin.username,
      },
    });
  }
}
