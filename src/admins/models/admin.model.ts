import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  fullname: string;
  username: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string | null;
  is_creator: boolean;
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
    type: DataType.STRING(50),
  })
  declare fullname: string; 

  @Column({
    type: DataType.STRING(50),
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare hashed_refresh_token: string | null;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_creator: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}
