import knex, { Knex } from "knex";
import IRepository from "../../core/repository/iRepository";
import buildInMemoryDb, {
  CsvPlayer,
  InMemoryDbPlayer,
} from "../../core/repository/inMemoryDatabase";
import { Player, PlayerBirth, PlayerDeath } from "../models";

export interface IPlayerRepository extends IRepository<Player> {
  findAll(): Promise<Player[]>;
}

export default class PlayerRepository implements IPlayerRepository {
  db: InMemoryDbPlayer;

  constructor(db: InMemoryDbPlayer) {
    this.db = db;
  }

  async findOne(id: string): Promise<Player | null> {
    const data = this.db[id];

    if (!data) {
      return null;
    }

    return this.dbToModel(data);
  }

  async findAll(): Promise<Player[]> {
    let data = Object.values(this.db).map((value) => {
      return this.dbToModel(value);
    });

    return data;
  }

  async find(ids: string[]): Promise<Player[]> {
    const data = ids.map((id) => {
      return this.dbToModel(this.db[id]);
    });

    return data;
  }

  private dbToModel(csvPlayer: CsvPlayer): Player {
    let playerBirth: PlayerBirth = {
      year: csvPlayer.birthYear,
      month: csvPlayer.birthMonth,
      day: csvPlayer.birthDay,
      country: csvPlayer.birthCountry,
      state: csvPlayer.birthState,
      city: csvPlayer.birthCity,
    };

    let playerDeath: PlayerDeath = {
      year: csvPlayer.deathYear,
      month: csvPlayer.deathMonth,
      day: csvPlayer.deathDay,
      country: csvPlayer.deathCountry,
      state: csvPlayer.deathState,
      city: csvPlayer.deathCity,
    };

    return {
      id: csvPlayer.playerID,
      firstName: csvPlayer.nameFirst,
      lastName: csvPlayer.nameLast,
      givenName: csvPlayer.nameGiven,
      weight: csvPlayer.weight,
      height: csvPlayer.height,
      bats: csvPlayer.bats,
      throws: csvPlayer.throws,
      debut: csvPlayer.debut,
      finalGame: csvPlayer.finalGame,
      retroID: csvPlayer.retroID,
      bbrefID: csvPlayer.bbrefID,
      birth: playerDeath,
      death: playerBirth,
    };
  }
}
