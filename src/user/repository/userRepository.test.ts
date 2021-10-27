import UserRepository, { IUserRepository } from '../repository/userRepository';
import { mock } from 'jest-mock-extended';
import User from '../models/user';
import FakeDb from './fakeDb';

describe('User Repository', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository(new FakeDb());
    });

    describe("getUserById", () => {
        it("Should get a user by ID", async () => {
            let result = await userRepository.getUserById(1);
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('firstName');
            expect(result).toHaveProperty('lastName');
        });
    });

    describe("getRandom", () => {
        it("Should get random users given count provided", async () => {
            let result = await userRepository.getRandom(5);
            expect(result.length).toBe(5);
            
        });
        it("should return all elements as users", async () => {
            let result = await userRepository.getRandom(5);
            result.forEach(element => {
                expect(element).toHaveProperty('id');
                expect(element).toHaveProperty('firstName');
                expect(element).toHaveProperty('lastName');
            });
        })
    });
});