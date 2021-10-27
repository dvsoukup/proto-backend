import User from "../models/user";
import FakeDb from "./fakeDb";

export default class UserRepository {
    db:Database;

    constructor(fakeDb: Database) {
        this.db = fakeDb;
    }
    async getUserById(id: number) {
        const data = await this.db.find(id);
        let user = new User();
        user.id = id;
        user.firstName = data.fname;
        user.lastName = data.lname;
        return user;
    }
}