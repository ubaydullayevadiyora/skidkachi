import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOtpCreationAttr {
  id: string;
  phone_number: string;
  otp: string;
  expiration_time: Date;
}

@Table({ tableName: "otp" })
export class Otp extends Model<Otp, IOtpCreationAttr> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  declare otp: string;

  @Column({
    type: DataType.DATE,
    primaryKey: true,
  })
  declare expiration_time: Date;

  @Column({
    type: DataType.BOOLEAN,
    primaryKey: true,
  })
  declare verified: boolean | null;
}
