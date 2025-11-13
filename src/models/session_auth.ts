import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "./account";
import moment from "moment";

interface SessionAuthAttributes {
  id: string;
  account_id: string;
  token: string;
  created_dt?: Date;
}

interface SessionAuthCreationAttributes extends Optional<SessionAuthAttributes, 'created_dt'> {}

@Table({
  tableName: "session_auths",
  timestamps: false,
})
export class SessionAuth extends Model<SessionAuth, SessionAuthCreationAttributes> {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  token!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: moment().format()
  })
  created_dt!: Date;
}
