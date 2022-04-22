import { IPlayerRepository } from "../repository/playerRepository";
import PlayerService from "./playerService";
import { mock } from "jest-mock-extended";

describe("User Service", () => {
  let playerService: PlayerService;

  let mocks = {
    playerRepository: mock<IPlayerRepository>(),
  };

  beforeEach(() => {
    mocks.playerRepository = mock<IPlayerRepository>();
    mocks.playerRepository.findOne.mockReturnValue(
      Promise.resolve({
        id: "abcd",
        firstName: "foo",
        lastName: "bar",
      })
    );
    playerService = new PlayerService(mocks.playerRepository);
  });

  describe("getUserById", () => {
    it("Should get a user by ID", async () => {
      playerService.getPlayerById("abcd");
      expect(mocks.playerRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
