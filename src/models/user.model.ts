import {
  Column,
  Model,
  NotEmpty,
  AllowNull,
  Table,
  Unique,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
class User extends Model {
  @Unique @AllowNull(false) @NotEmpty @Column declare userName: string;
  @Unique @AllowNull(false) @NotEmpty @Column declare email: string;
  @AllowNull(false) @NotEmpty @Column declare password: string;

  public static async doesEmailExists(email: string) {
    const count = await this.count({ where: { email } });
    return count > 0;
  }
  public static async doesUsernameExists(userName: string) {
    const count = await this.count({ where: { userName } });
    return count > 0;
  }

  public get sanitize() {
    return {
      id: this.id,
      userName: this.userName,
      email: this.email,
    };
  }
}

export default User;
