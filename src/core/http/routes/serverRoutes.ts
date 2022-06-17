import { FastifyInstance } from "fastify";
import IRouter from "../interfaces/router";

export default class ServerRoutes implements IRouter {
  v1Routes(fastify: FastifyInstance, options: object) {
    fastify.get("/status", async (request, reply) => {
      let data = `<div> Fastify server running at http://${request.hostname}</div>`;
      data += `<div>Time: ${new Date()}</div>`;
      data += `<div>Info:</div><pre><code>${fastify.printRoutes()}</code></pre>`;
      reply.type("text/html").send(data);
    });
  }
}
