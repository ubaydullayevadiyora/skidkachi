import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Region } from "../../region/models/region.model";
import { District } from "../../district/models/district.model";
import { storeSocialLinks } from "../../storeSocialLinks/models/storeSocialLinks.model";

interface IStoreCreationAttr {
  name: string;
  location: string;
  phone: string;
  ownerId: number;
  description: string;
  regionId: number;
  districtId: number;
  address: string;
  statusId: number;
  openTime: Date;
  closeTime: Date;
  weekday: string; 
}

@Table({ tableName: "store" })
export class Store extends Model<Store, IStoreCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare location: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare phone: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, field: "owner_id" })
  declare ownerId: number;

  @BelongsTo(() => User, { as: "owner" })
  declare owner: User;

  @ForeignKey(() => Region)
  @Column({ type: DataType.BIGINT, field: "region_id" })
  declare regionId: number;

  @BelongsTo(() => Region)
  declare region: Region;

  @ForeignKey(() => District)
  @Column({ type: DataType.BIGINT, field: "district_id" })
  declare districtId: number;

  @BelongsTo(() => District)
  declare district: District;

  @Column({ type: DataType.STRING })
  declare address: string;

  @Column({ type: DataType.TIME, field: "open_time" })
  declare openTime: Date;

  @Column({ type: DataType.TIME, field: "close_time" })
  declare closeTime: Date;

  @Column({ type: DataType.STRING })
  declare weekday: string;

  @ForeignKey(() => storeSocialLinks)
  @Column({ type: DataType.BIGINT, field: "store_social_link_id" })
  declare storeSocialLinkId: number;

  @BelongsTo(() => storeSocialLinks)
  declare storeSocialLink: storeSocialLinks;

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare createdAt: Date;
}
