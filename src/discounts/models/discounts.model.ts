import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IDiscountCreationAttr {
  storeId: number;
  title: string;
  description: string;
  discount_percent: number;
  start_date: Date;
  end_date: Date;
  categoryId: number;
  discount_value: number;
  special_link: string;
  is_active: boolean;
  type_id: number;
}

@Table({ tableName: "discount" })
export class Discount extends Model<Discount, IDiscountCreationAttr> {
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
}
