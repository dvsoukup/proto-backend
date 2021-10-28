import User from '../models/user';
import { IUserDatabase } from '../repository/userRepository';
import UserService from './userService';
import { mock } from 'jest-mock-extended';

describe('User Service', () => {
    let userService: UserService;

    let mocks = {
        userRepository: mock<IUserDatabase>()
    };

    beforeEach(() => {
        mocks.userRepository = mock<IUserDatabase>();
        userService = new UserService(mocks.userRepository);
    });

    describe("getUserById", () => {
        it("Should get a user by ID", async () => {
            userService.getUserById(1);
            expect(mocks.userRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe("getRandomUsers", () => {
        it("Should invoke repo call", async () => {
            let expected = 2;
            userService.getRandomUsers(expected);
            expect(mocks.userRepository.findRandom).toHaveBeenCalledTimes(1);
            expect(mocks.userRepository.findRandom).toHaveBeenCalledWith(expected);
        });
    });
});