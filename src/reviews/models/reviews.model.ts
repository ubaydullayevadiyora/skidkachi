import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
} from "sequelize-typescript";
import { Discounts } from "../../discounts/models/discounts.model";
import { User } from "../../users/models/user.model";

interface IReviewsCreationAttr {
  discountId: number;
  userId: number;
  comment: string;
  rating: number;
}

@Table({ tableName: "reviews" })
export class Reviews extends Model<Reviews, IReviewsCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Discounts)
  @Column({
    type: DataType.BIGINT,
    field: "discount_id",
  })
  declare discountId: number;

  @BelongsTo(() => Discounts)
  declare discount: Discounts;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: "user_id",
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    type: DataType.STRING,
  })
  declare comment: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare rating: number;
}
