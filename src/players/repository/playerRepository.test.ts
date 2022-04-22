import PlayerRespository, {
  IPlayerRepository,
} from "../repository/playerRepository";

import db from "../../core/repository/inMemoryDatabase";

describe("Player Repository", () => {
  let playerRespository: IPlayerRepository;

  beforeAll(async () => {
    let inMemDb = await db();
    playerRespository = new PlayerRespository(inMemDb);
  });

  afterAll(() => {
    // db.destroy();
  });

  describe("findOne", () => {
    it("Should get a user by ID", async () => {
      let result = await playerRespository.findOne("muncyma01");
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("firstName");
      expect(result).toHaveProperty("lastName");
    });
  });

  // describe("find", () => {
  //   it("Should find the ids given", async () => {
  //     let [user1, user2, user3] = await playerRespository.find([4, 5, 6]);
  //     expect(user1.id).toBe(4);
  //     expect(user2.id).toBe(5);
  //     expect(user3.id).toBe(6);
  //   });
  // });

  // describe("findRandom", () => {
  //   it("Should get random users given count provided", async () => {
  //     let result = await playerRespository.findRandom(5);
  //     expect(result.length).toBeLessThan(6);
  //   });

  //   it("should return all elements as users", async () => {
  //     let result = await playerRespository.findRandom(5);

  //     result.forEach((element) => {
  //       expect(element).toHaveProperty("id");
  //       expect(element).toHaveProperty("firstName");
  //       expect(element).toHaveProperty("lastName");
  //     });
  //   });
  // });
});
