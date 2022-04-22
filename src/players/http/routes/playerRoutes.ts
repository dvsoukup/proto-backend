import { FastifyInstance } from "fastify";
import IRouter from "../../../core/http/interfaces/router";
import { Player } from "../../models/player";
import PlayerService from "../../services/playerService";
import { IPlayerRequest } from "./playerRoute.interfaces";

export default class UserRoutes implements IRouter {
  playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }

  routes(fastify: FastifyInstance, options: object): void {
    fastify.get<IPlayerRequest>("/players/:id", async (request, reply) => {
      const userId = request.params.id;

      try {
        let player = await this.playerService.getPlayerById(userId);
        reply.send(JSON.stringify(player));
      } catch (error: any) {
        reply.status(400).send(error.message);
      }
    });

    fastify.get<IPlayerRequest>("/players", async (request, reply) => {
      try {
        let players = await this.playerService.getAllPlayers();
        reply.send(JSON.stringify(players));
      } catch (error: any) {
        reply.status(400).send(error.message);
      }
    });
  }
}
