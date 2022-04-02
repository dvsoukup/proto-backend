import knex, { Knex } from "knex";
import { IDatabase } from "../../core/repository/interface/database";
import User from "../models/user";

export interface IUserDatabase extends IDatabase<User> {
  findRandom(count: number): Promise<User[]>;
}

export default class UserRepository implements IUserDatabase {
  db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async findOne(id: number): Promise<User | null> {
    const [data] = await this.db<User>("users")
      .select("id", "fname as firstName", "lname as lastName")
      .where("id", id);

    let user: User = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    return user;
  }

  async find(ids: number[]): Promise<User[]> {
    let result = await this.db<User>("users")
      .select("id", "fname as firstName", "lname as lastName")
      .whereIn("id", ids);

    return result;
  }

  async save(user: User): Promise<User> {
    let [createdUser] = await this.db("users").insert<any, [User]>(
      { fname: user.firstName, lname: user.lastName },
      ["id", "fname as firstName", "lname as lastName"]
    );
    console.log("test"); //////
    return createdUser;
  }

  async findRandom(count: number): Promise<User[]> {
    let result = await this.db<User>("users")
      .select("id", "fname as firstName", "lname as lastName")
      .limit(count)
      .orderByRaw("NEWID()");

    return result;
  }

  private generateUniqueRandom(count: number): number[] {
    let randomIdsChosen = [];
    for (let index = 0; index < count; index++) {
      let randomId = this.generateRandom(1, count - 1, randomIdsChosen);
      randomIdsChosen.push(randomId);
    }
    return randomIdsChosen;
  }

  private generateRandom(
    min: number,
    max: number,
    toExclude: number[] = []
  ): number {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return toExclude.includes(num)
      ? this.generateRandom(min, max, toExclude)
      : num;
  }
}
