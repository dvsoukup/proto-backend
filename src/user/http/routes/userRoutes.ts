import { FastifyInstance } from "fastify";
import IRouter from "../../../core/http/interfaces/router";
import User from "../../models/user";
import UserService from "../../services/userService";
import {
  IRandomUsersRequest,
  IUserRequest,
  IUsersPostRequest,
} from "./userRoute.interfaces";

export default class UserRoutes implements IRouter {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  routes(fastify: FastifyInstance, options: object): void {
    fastify.get<IUserRequest>("/users/:id", async (request, reply) => {
      const userId = Number(request.params.id);
      let user = await this.userService.getUserById(userId);
      reply.send(JSON.stringify(user));
    });

    fastify.get<IRandomUsersRequest>(
      "/users/random",
      async (request, reply) => {
        const count = Number(request.query.count);
        let users = await this.userService.getRandomUsers(count);
        reply.send(users);
      }
    );

    fastify.post<IUsersPostRequest>("/users", async (request, reply) => {
      let payload = request.body;

      let user: User = {
        ...payload.data,
      };

      try {
        await this.userService.save(user);
      } catch (error) {
        reply.status(500).send("Server error occurred");
        return;
      }

      reply.send("Saved!");
    });
  }
}
