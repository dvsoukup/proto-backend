import { FastifyInstance } from "fastify";

export default interface IRouter {
    routes(fastify: FastifyInstance, options: any): void;
}