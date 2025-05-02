import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStoreCreationAttr {
  name: string;
  location: string;
  phone: string;
  createdAt: Date;
  ownerId: number;
  storeSocialLinkId: number;
  since: Date;
  districtId: number;
  regionId: number;
}

@Table({ tableName: "store" })
export class Store extends Model<Store, IStoreCreationAttr> {
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
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare phone: string;

  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.INTEGER,
  })
  declare ownerId: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare storeSocialLinkId: number;

  @Column({
    type: DataType.DATE,
  })
  declare since: Date;

  @Column({
    type: DataType.INTEGER,
  })
  declare districId: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare regionId: number;
}
