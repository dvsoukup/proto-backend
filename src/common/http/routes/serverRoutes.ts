import { FastifyInstance } from "fastify"
import IRouter from "../interfaces/router";

export default class ServerRoutes implements IRouter {
    routes(fastify: FastifyInstance, options: object) {          
        fastify.get('/status', async (request, reply) => {
            let data = `<div> Fastify server running at http://${request.hostname}</div>`;
            data += `<div>Time: ${new Date()}</div>`
            reply.type("text/html").send(data);
        });
    }
}