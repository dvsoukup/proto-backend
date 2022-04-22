import { RequestGenericInterface } from "fastify";

export interface IPlayerRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
}
