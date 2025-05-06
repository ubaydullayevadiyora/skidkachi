import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Store } from "../../store/models/store.model";
import { User } from "../../users/models/user.model";

interface IFavouritesCreationAttr {
  userId: number;
  storeId: number;

}

@Table({ tableName: "favourites" })
export class Favourites extends Model<Favourites, IFavouritesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: "user_id" })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, field: "store_id" })
  declare storeId: number;

  @BelongsTo(() => Store)
  declare store: Store;
}
