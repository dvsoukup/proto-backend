import { FastifyInstance } from "fastify";
import { ServerResponse } from "http";
import IRouter from "../../../core/http/interfaces/router";
import PlayerService from "../../services/playerService";
import { IPlayerRequest } from "./playerRoute.interfaces";

export default class UserRoutes implements IRouter {
  playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }

  v1Routes(fastify: FastifyInstance, options: object): void {
    fastify.get<IPlayerRequest>("/players/:id", async (request, reply) => {
      const userId = request.params.id;
      
      try {
        let player = await this.playerService.getPlayerById(userId);
        // reply.send(JSON.stringify(player));
        const val = reply.serialize(player);
        reply.send(player);
      } catch (error: any) {
        reply.status(400).send(error.message);
      }
    });

    fastify.get<IPlayerRequest, ServerResponse>("/players", async (request, reply) => {
      try {
        let players = await this.playerService.getAllPlayers();
        reply.send(JSON.stringify(players));
      } catch (error: any) {
        reply.status(400).send(error.message);
      }
    });
  }
}
