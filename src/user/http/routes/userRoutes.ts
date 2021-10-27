import { FastifyInstance } from "fastify"
import IRouter from "../../../common/http/interfaces/router";
import UserService from "../../services/userService";
import {IUserRequest} from "./@types/requests/userRoute.types";

export default class UserRoutes implements IRouter {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    routes(fastify: FastifyInstance, options: object): void {          
        fastify.get<IUserRequest>('/user', async (request, reply) => {
            const userId = Number(request.query.id);
            let user = await this.userService.getUserById(userId);
            reply.send(JSON.stringify(user));
        });
    }
}