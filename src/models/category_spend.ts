import moment from "moment";
import { Optional } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CategorySpendAttributes {
  id: string;
  account_id: string;
  name: string;
  status?: boolean;
  created_dt?: Date;
}

interface CategorySpendCreationAttributes extends Optional<CategorySpendAttributes, 'status' | 'created_dt'> {}

@Table({
  tableName: "categories_spend",
  timestamps: false,
})
export class CategorySpend extends Model<CategorySpend, CategorySpendCreationAttributes> {
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
  name!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  status!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: moment().format()
  })
  created_dt!: Date;
}
