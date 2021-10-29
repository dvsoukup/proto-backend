import containerFactory from "../../infrastructure/container";
import { AwilixContainer } from "awilix";
import { FastifyInstance } from "fastify";
import IRouter from "../interfaces/router";

let allRoutes = ["serverRoutes", "userRoutes"];

export default async (server: FastifyInstance, opts: object) => {
  const container: AwilixContainer = containerFactory.getContainer();

  server.addHook("preHandler", async (req, res) => {
    if (res.sent) return; //stop on error (like user authentication)
  });

  allRoutes.forEach((domainRoutes: string) => {
    let routes: IRouter = container.resolve(domainRoutes);
    routes.routes(server, opts);
  });
};
