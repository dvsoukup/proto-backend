import UserRepository from "../repository/userRepository";

export default class UserService {
    userRepository:UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    getUserById(id: number) {
        return this.userRepository.getUserById(id);
    }
}