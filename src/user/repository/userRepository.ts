import User from "../models/user";
import FakeDb from "./fakeDb";

export interface IUserRepository {
    getUserById(id: number): Promise<User>,
    getRandom(count: number): Promise<User[]>
}

export default class UserRepository implements IUserRepository {
    db:Database;

    constructor(fakeDb: Database) {
        this.db = fakeDb;
    }
    async getUserById(id: number): Promise<User> {
        const data = await this.db.findOne(id);
        let user: User = {
            id: data.id,
            firstName: data.fname,
            lastName: data.lname
        };
        return user;
    }
    async getRandom(count: number): Promise<User[]> {
        let totalCount = (await this.db.findAll()).size;
        let ids = this.generateUniqueRandom(count, totalCount);
        
        let userFetch = ids.map(id => {
            return this.db.findOne(id);
        });
        
        let users = await Promise.all(userFetch);
        
        return users.map(data => {
            let user: User = {
                id: data.id,
                firstName: data.fname,
                lastName: data.lname
            };
            return user;
        });
    }

    private generateUniqueRandom(count: number, totalCount: number): number[] {
        
        let randomIdsChosen = [];
        for (let index = 0; index < count; index++) {
            let randomId = this.generateRandom(0, totalCount - 1, randomIdsChosen);
            randomIdsChosen.push(randomId);
        }
        return randomIdsChosen;
    }

    private generateRandom(min: number, max: number, toExclude: number[] = []): number {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return toExclude.includes(num) ? this.generateRandom(min, max, toExclude) : num;
    }
}