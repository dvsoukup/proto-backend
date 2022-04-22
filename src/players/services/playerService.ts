import { Player } from "../models/player";
import { IPlayerRepository } from "../repository/playerRepository";

export default class PlayerService {
  playerRepository: IPlayerRepository;

  constructor(playerRepository: IPlayerRepository) {
    this.playerRepository = playerRepository;
  }

  async getPlayerById(id: string) {
    let player = await this.playerRepository.findOne(id);
    if (!player) {
      throw new Error("User not found");
    }

    return player;
  }

  async getPlayers(ids: string[]): Promise<Player[]> {
    return this.playerRepository.find(ids);
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.findAll();
  }
}
