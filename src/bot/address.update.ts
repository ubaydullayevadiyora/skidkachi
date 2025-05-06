import { AddressService } from './address.service';
import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class AddressUpdate {
  constructor(private readonly addressService: AddressService) {}

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    return this.addressService.onAddress(ctx);
  }

  @Hears("Yangi manzil qo'shish")
  async onNewAddress(@Ctx() ctx: Context) {
    return this.addressService.onNewAddress(ctx);
  }
}