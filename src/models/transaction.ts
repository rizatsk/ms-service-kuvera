import { Optional } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { TypeTransaction } from "../business/repositories/type";

interface TransactionAttributes {
  id: string;
  account_id: string;
  category_id: string;
  money_spent: number;
  notes?: string;
  type: TypeTransaction;
  created_dt: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'notes'> {}

@Table({
  tableName: "transactions",
  timestamps: false,
})
export class Transaction extends Model<Transaction, TransactionCreationAttributes> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  account_id!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  category_id!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  money_spent!: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  notes!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_dt!: Date;
}
