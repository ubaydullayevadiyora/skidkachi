import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { storeSocialLinks } from "../../storeSocialLinks/models/storeSocialLinks.model";


interface ISocialMediaTypeCreationAttr {
  based_url: string;
  is_active: boolean;
}

@Table({ tableName: "social_media_type" })
export class SocialMediaType extends Model<
  SocialMediaType,
  ISocialMediaTypeCreationAttr
> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare based_url: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  @HasMany(() => storeSocialLinks)
  declare store_social_links: storeSocialLinks[];
}
