import { Knex } from "knex";
import { IDatabase } from "../../common/repository/interface/database";
import User from "../models/user";


export interface IUserDatabase extends IDatabase<User> {
    findRandom(count: number): Promise<User[] | null>
}

export default class UserRepository implements IUserDatabase {
    db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }
    async findOne(id: number): Promise<User | null> {
        const [data] = await this.db.where({
            id: id
        })
            .select('id', 'fname as firstName', 'lname as lastName')
            .from<User>('users');
            
        let user: User = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName
        };

        return user;
    }

    async find(ids: number[]): Promise<User[]> {
        let result = await this.db.select("id", "fname as firstName", "lname as lastName")
            .whereIn('id', ids)
            .from<User>('users');
        
        return result;
    }

    async save(user: User): Promise<User> {
        let [createdUser] = await this.db.insert({ fname: user.firstName, lname: user.lastName }, ["id", "fname as firstName", "lname as lastName"]).into('users');
        return createdUser;
    }

    async findRandom(count: number): Promise<User[]> {
        let [{total}] = await this.db.count<Record<string, number>[]>({total: "id"}).from('users');
        let ids = this.generateUniqueRandom(count, total);

        return this.find(ids);
    }

    private generateUniqueRandom(count: number, totalCount: number): number[] {

        let randomIdsChosen = [];
        for (let index = 0; index < count; index++) {
            let randomId = this.generateRandom(1, totalCount - 1, randomIdsChosen);
            randomIdsChosen.push(randomId);
        }
        return randomIdsChosen;
    }

    private generateRandom(min: number, max: number, toExclude: number[] = []): number {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return toExclude.includes(num) ? this.generateRandom(min, max, toExclude) : num;
    }
}