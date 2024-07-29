import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
class User extends Model {
  @Column declare userName: string;
  @Column declare email: string;
  @Column declare password: string;
}

export default User;
