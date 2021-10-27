import { RequestGenericInterface } from "fastify"

export interface IUserRequest extends RequestGenericInterface {
    Querystring: {
      id: string,
      name: string
    }
}

// export default {IUserRequest};
