import moment from "moment";
import { Optional } from "sequelize";
import { Table, Column, Model, DataType } from "sequelize-typescript";

interface AccountAttributes {
  id: string;
  email: string;
  created_dt?: Date;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'created_dt'> {}

@Table({
  tableName: "accounts",
  timestamps: false,
})
export class Account extends Model<Account, AccountCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: moment().format()
  })
  created_dt!: Date;
}
