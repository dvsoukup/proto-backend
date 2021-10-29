import { RequestGenericInterface } from "fastify";

export interface IUserRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
}

export interface IRandomUsersRequest extends RequestGenericInterface {
  Querystring: {
    count: number;
  };
}

export interface IUsersPostRequest extends RequestGenericInterface {
  Body: {
    data: {
      firstName: string;
      lastName: string;
    };
  };
}

// export default {IUserRequest};
