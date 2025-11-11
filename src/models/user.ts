import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "./account";

interface UserAttributes {
  id: string;
  account_id: string;
  name: string;
  photo_profile_url: string;
  updated_dt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'updated_dt'> {}

@Table({
  tableName: "users",
  timestamps: false,
})
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  account_id!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo_profile_url!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_dt!: Date;
}
