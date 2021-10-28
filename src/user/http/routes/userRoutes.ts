import { FastifyInstance } from "fastify"
import IRouter from "../../../common/http/interfaces/router";
import User from "../../models/user";
import UserService from "../../services/userService";
import {IUserRequest} from "./@types/requests/userRoute.types";

export default class UserRoutes implements IRouter {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    routes(fastify: FastifyInstance, options: object): void {          
        fastify.get<IUserRequest>('/users', async (request, reply) => {
            const userId = Number(request.query.id);
            let user = await this.userService.getUserById(userId);
            reply.send(JSON.stringify(user));
        });

        fastify.post<any>('/users', async (request, reply) => {
            let payload = JSON.parse(request.body);

            let user: User = {...payload.data};

            try {
                await this.userService.save(user);
            } catch (error) {
                reply.status(500).send("Server error occurred");
                return;
            }
            
            reply.send("Saved!");
        })
    }
}