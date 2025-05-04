import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUserCreationAttr {
  name: string;
  phone: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string | null;
  is_active: boolean;
  is_owner: boolean;
  location: string;
  regionId: number;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    validate: { is: /^[0-9]{9}$/ }, // Telefon raqami formati
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(50),
    validate: { isEmail: true }, // Email formati
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true, // Agar refresh token bo'lmasa null bo'lishi mumkin
  })
  declare hashed_refresh_token: string | null;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
  })
  declare activation_link: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare regionId: number; // Region bilan bog'lash
}
