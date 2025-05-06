import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Discounts } from "../../discounts/models/discounts.model";

interface ITypeCreationAttr {
  name: string;
  description?: string;
}

@Table({ tableName: "type" })
export class Type extends Model<Type, ITypeCreationAttr> {
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

  @HasMany(() => Discounts)
  declare discounts: Discounts[];
}
