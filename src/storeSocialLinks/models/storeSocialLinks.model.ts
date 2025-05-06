import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { SocialMediaType } from "../../socialMediaType/models/socialMediaType.model";

interface IStoreSocialLinksCreationAttr {
  url: string;
  description: string;
  storeId: number;
  socialMediaTypeId: number;
}

@Table({ tableName: "storeSocialLinks" })
export class storeSocialLinks extends Model<
  storeSocialLinks,
  IStoreSocialLinksCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare url: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare storeId: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare socialMediaTypeId: number;

  @BelongsTo(() => SocialMediaType)
  declare socialMediaType: SocialMediaType;
}
