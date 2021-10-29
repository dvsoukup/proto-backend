import User from "../models/user";
import { IUserDatabase } from "../repository/userRepository";

export default class UserService {
  userRepository: IUserDatabase;
  constructor(userRepository: IUserDatabase) {
    this.userRepository = userRepository;
  }
  async getUserById(id: number) {
    return this.userRepository.findOne(id);
  }
  async getUsers(ids: number[]): Promise<User[]> {
    return this.userRepository.find(ids);
  }
  async getRandomUsers(count: number): Promise<User[] | null> {
    return this.userRepository.findRandom(count);
  }
  async save(user: User) {
    return this.userRepository.save(user);
  }
}
