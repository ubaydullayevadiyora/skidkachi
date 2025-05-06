import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district" })
export class District extends Model<District, IDistrictCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "region_id",
  })
  declare regionId: number;

  @BelongsTo(() => Region)
  declare region: Region;
}
