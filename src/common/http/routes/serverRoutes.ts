import { FastifyInstance } from "fastify"
import IRouter from "../interfaces/router";

export default class ServerRoutes implements IRouter {
    routes(fastify: FastifyInstance, options: object) {          
        fastify.get('/status', async (request, reply) => {
            reply.send({ date: new Date(), status: 'Fastify server running!' });
        });
    }
}