import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  email: string;
  is_creator: boolean;
  hashed_password: string;
  username: string;
  hashed_refresh_token: string;
  is_active: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_creator: boolean;

  @Column({
    type: DataType.STRING(50),
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_refresh_token: string | null;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}
