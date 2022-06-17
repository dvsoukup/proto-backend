import { RequestGenericInterface } from "fastify";

export interface IPlayerRequest extends RequestGenericInterface {
  Querystring: {
    ids: string;
  };
}
