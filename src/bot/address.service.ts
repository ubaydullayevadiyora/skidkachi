import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InjectBot, Phone } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Bot } from "./model/bot.model";
import { Address } from "./model/address.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
    @InjectModel(Address) private readonly addressModel: typeof Address
  ) {}

  async onAddress(ctx: Context) {
    try {
      await ctx.replyWithHTML("manzil boyicha kerakli tugmani bosing", {
        ...Markup.keyboard([["Mening manzillarim", "Yangi manzil qo'shish"]]),
      });
    } catch (error) {
      console.log(`❌ Error on Contact:`, error);
    }
  }

  async onNewAddress(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`iltimos startni bosing`, {
          ...Markup.keyboard([["..."]]),
        });
      }

      const newAddress = await this.addressModel.create({
        user_id: user_id!,
        last_state: "name",
      });

      await ctx.replyWithHTML("yangi manzil nomini kiriting:", {
        ...Markup.removeKeyboard(),
      });
    } catch (error) {
      console.log(`❌ Error on Contact:`, error);
    }
  }
}
