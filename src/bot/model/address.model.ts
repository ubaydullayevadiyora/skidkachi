import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAddressCreation {
  user_id: number;
  last_state: string;
//   name: string;
//   address: string | null;
//   location: string;
}

@Table({ tableName: "adrres" })
export class Address extends Model<Address, IAddressCreation> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare address: string | null;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare last_state: string;
}
