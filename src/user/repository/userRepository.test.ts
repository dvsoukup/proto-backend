import UserRepository, { IUserDatabase } from '../repository/userRepository';
import db from '../../common/repository/interface/database';

describe('User Repository', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository(db);
    });

    afterAll(() => {
        db.destroy();
    })

    describe("findOne", () => {
        it("Should get a user by ID", async () => {
            let result = await userRepository.findOne(1);
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('firstName');
            expect(result).toHaveProperty('lastName');
        });
    });

    describe("find", () => {
        it("Should find the ids given", async () => {
            let [user1, user2, user3] = await userRepository.find([4, 5, 6]);
            expect(user1.id).toBe(4);
            expect(user2.id).toBe(5);
            expect(user3.id).toBe(6);
        });
    });

    describe("findRandom", () => {
        it("Should get random users given count provided", async () => {
            let result = await userRepository.findRandom(5);
            expect(result.length).toBe(5);
        });

        it("should return all elements as users", async () => {
            let result = await userRepository.findRandom(5);
            
            result.forEach(element => {
                expect(element).toHaveProperty('id');
                expect(element).toHaveProperty('firstName');
                expect(element).toHaveProperty('lastName');
            });
        })
    });
});