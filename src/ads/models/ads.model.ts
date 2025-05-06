import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdsCreationAttr {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  target_url: string;
  placement: string;
  status: string;
  view_count: number;
}

@Table({ tableName: "ads" })
export class Ads extends Model<Ads, IAdsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.DATE,
  })
  declare start_date: Date;

  @Column({
    type: DataType.DATE,
  })
  declare end_date: Date;

  @Column({
    type: DataType.STRING,
  })
  declare target_url: string;

  @Column({
    type: DataType.STRING,
  })
  declare placement: string;

  @Column({
    type: DataType.STRING,
  })
  declare status: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare view_count: number;
}
