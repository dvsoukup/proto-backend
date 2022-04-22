import { FastifyInstance } from "fastify";

export default interface IRouter {
  v1Routes(fastify: FastifyInstance, options: any): void;
}
