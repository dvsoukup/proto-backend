import PlayerRespository, {
  IPlayerRepository,
} from "../repository/playerRepository";

import {InMemoryDbPlayer} from "../../core/repository/inMemoryDatabase";

describe("Player Repository", () => {
  let playerRespository: IPlayerRepository;
  let fakeDb: InMemoryDbPlayer;

  beforeAll(async () => {
    fakeDb = {
      "foo": {
          "playerID": "foo",
          "nameFirst": "Max",
          "nameLast": "Muncy",
          "nameGiven": "Maxwell Steven",
          "weight": "210",
          "height": "72",
          "bats": "L",
          "throws": "R",
          "debut": "2015-04-25",
          "finalGame": "2016-09-29",
          "retroID": "muncm001",
          "bbrefID": "muncyma01",
          "birthYear": "",
          "birthMonth": "",
          "birthDay": "",
          "birthCountry": "",
          "birthState": "",
          "birthCity": "",
          "deathYear": "1990",
          "deathMonth": "8",
          "deathDay": "25",
          "deathCountry": "USA",
          "deathState": "TX",
          "deathCity": "Midland"
      },
      "bar": {
          "playerID": "bar",
          "nameFirst": "Max",
          "nameLast": "Muncy",
          "nameGiven": "Maxwell Steven",
          "weight": "210",
          "height": "72",
          "bats": "L",
          "throws": "R",
          "debut": "2015-04-25",
          "finalGame": "2016-09-29",
          "retroID": "muncm001",
          "bbrefID": "muncyma01",
          "birthYear": "",
          "birthMonth": "",
          "birthDay": "",
          "birthCountry": "",
          "birthState": "",
          "birthCity": "",
          "deathYear": "1990",
          "deathMonth": "8",
          "deathDay": "25",
          "deathCountry": "USA",
          "deathState": "TX",
          "deathCity": "Midland"
      },
      "baz": {
        "playerID": "baz",
        "nameFirst": "Max",
        "nameLast": "Muncy",
        "nameGiven": "Maxwell Steven",
        "weight": "210",
        "height": "72",
        "bats": "L",
        "throws": "R",
        "debut": "2015-04-25",
        "finalGame": "2016-09-29",
        "retroID": "muncm001",
        "bbrefID": "muncyma01",
        "birthYear": "",
        "birthMonth": "",
        "birthDay": "",
        "birthCountry": "",
        "birthState": "",
        "birthCity": "",
        "deathYear": "1990",
        "deathMonth": "8",
        "deathDay": "25",
        "deathCountry": "USA",
        "deathState": "TX",
        "deathCity": "Midland"
    }
    };
    playerRespository = new PlayerRespository(fakeDb);
  });

  describe("findOne", () => {
    it("Should get a user by ID", async () => {
      let result = await playerRespository.findOne("foo");
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("firstName");
      expect(result).toHaveProperty("lastName");
      expect(result).toHaveProperty("weight");
      expect(result).toHaveProperty("height");
      expect(result).toHaveProperty("bats");
      expect(result).toHaveProperty("throws");
    });
  });

  describe("find", () => {
    it("Should get find specific users", async () => {
      let result = await playerRespository.find(["foo", "baz"]);
      expect(Object.keys(result).length).toEqual(2);
    });
  });

  describe("findAll", () => {
    it("Should get all users", async () => {
      let result = await playerRespository.findAll();
      expect(Object.keys(result).length).toEqual(Object.keys(fakeDb).length);
    });
  });
});
