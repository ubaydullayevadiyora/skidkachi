import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district" })
export class District extends Model<District, IDistrictCreationAttr> {
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
    type: DataType.INTEGER,
  })
  declare regionId: number;
}
