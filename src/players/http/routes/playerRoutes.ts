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
    fastify.get<IPlayerRequest>("/players", async (request, reply) => {
      const userIds = request.query.ids.split(",");

      try {
        let player = await this.playerService.getPlayers(userIds);
        reply.send(player);
      } catch (error: any) {
        reply.status(400).send(error.message);
      }
    });

    fastify.get<IPlayerRequest, ServerResponse>(
      "/players/all",
      async (request, reply) => {
        try {
          let players = await this.playerService.getAllPlayers();
          reply.send(JSON.stringify(players));
        } catch (error: any) {
          reply.status(400).send(error.message);
        }
      }
    );
  }
}
