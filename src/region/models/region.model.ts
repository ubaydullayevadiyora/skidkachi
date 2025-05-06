import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "../../district/models/district.model";

interface IRegionCreationAttr {
  name: string;
}

@Table({ tableName: "region" })
export class Region extends Model<Region, IRegionCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @HasMany(() => District)
  declare districts: District[];
}
