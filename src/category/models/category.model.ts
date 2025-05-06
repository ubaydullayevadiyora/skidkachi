import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  Model,
  Table,
} from "sequelize-typescript";
import { Discounts } from "../../discounts/models/discounts.model";

interface ICategoryCreationAttr {
  name: string;
  description?: string;
  parent_id?: number;
}

@Table({ tableName: "category" })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.TEXT)
  declare description: string;

  @ForeignKey(() => Category)
  @Column(DataType.BIGINT)
  declare parent_id: number;

  @BelongsTo(() => Category, { as: "parent" })
  declare parent: Category;

  @HasMany(() => Category, { as: "children", foreignKey: "parent_id" })
  declare children: Category[];

  @HasMany(() => Discounts)
  declare discounts: Discounts[];
}
