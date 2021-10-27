import User from '../models/user';
import UserRepository, { IUserRepository } from '../repository/userRepository';
import UserService from './userService';
import { mock } from 'jest-mock-extended';

describe('User Service', () => {
    let userService: UserService;

    let mocks = {
        userRepository: mock<IUserRepository>()
    };

    beforeEach(() => {
        mocks.userRepository = mock<IUserRepository>();
        userService = new UserService(mocks.userRepository);
    });

    describe("getUserById", () => {
        it("Should get a user by ID", async () => {
            userService.getUserById(1);
            expect(mocks.userRepository.getUserById).toHaveBeenCalledTimes(1);
        });
    });

    describe("getRandomUsers", () => {
        it("Should invoke repo call", async () => {
            let expected = 2;
            userService.getRandomUsers(expected);
            expect(mocks.userRepository.getRandom).toHaveBeenCalledTimes(1);
            expect(mocks.userRepository.getRandom).toHaveBeenCalledWith(expected);
        });
    });
});