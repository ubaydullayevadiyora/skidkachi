import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
} from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { Type } from "../../type/models/type.model";

@Table({ tableName: "discounts" })
export class Discounts extends Model {
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

  @ForeignKey(() => Category)
  @Column(DataType.BIGINT)
  declare category_id: number;

  @BelongsTo(() => Category)
  declare category: Category;

  @ForeignKey(() => Type)
  @Column(DataType.BIGINT)
  declare type_id: number;

  @BelongsTo(() => Type)
  declare type: Type;
}
