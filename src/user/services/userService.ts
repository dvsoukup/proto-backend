import User from "../models/user";
import { IUserRepository } from "../repository/userRepository";

export default class UserService {
    userRepository:IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    async getUserById(id: number) {
        return this.userRepository.getUserById(id);
    }
    async getRandomUsers(count: number): Promise<User[]> {
        return this.userRepository.getRandom(count);
    }
}