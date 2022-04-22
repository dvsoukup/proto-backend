import { config as envConfig } from "dotenv";
envConfig();
import colors from "colors";
import Fastify, { FastifyInstance } from "fastify";
import cors from "fastify-cors";
import process from "process";
import { AwilixContainer } from "awilix";
import diContainer from "./core/infrastructure/container";

import v1Routes from "./core/http/routes";

class Bootstrap {
  container: AwilixContainer | undefined;
  server: FastifyInstance;
  port: number;

  constructor() {
    this.server = Fastify({
      //logger: true,
    });
    this.port = Number(process.env.SERVER_PORT);
  }

  buildContainer = async () => {
    this.container = await diContainer.make();
  };

  start = async () => {
    try {
      this.registerCors();
      this.registerRoutes();
      this.setContentParsers();
      await this.server.listen(this.port);

      const address = this.server.server.address();
      let msg = [
        colors.rainbow("************************************************"),
        "",
        `${colors.green("Server started")}`,
        "",
        `${colors.green("Navigate to -")} ${colors.cyan(
          "http://localhost:" + this.port + "/api/v1/status"
        )}`,
        "",
        colors.rainbow("************************************************"),
      ].join("\n");
      console.log(msg);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  private registerRoutes = () => {
    this.server.register(v1Routes, {
      prefix: "/api/v1",
    });
  };

  private registerCors = () => {
    this.server.register(cors, {
      origin: true,
    });
  };

  private setContentParsers = () => {
    this.server.addContentTypeParser(
      "application/json",
      { parseAs: "string" },
      (req, body: string, done) => {
        try {
          var json = JSON.parse(body);
          done(null, json);
        } catch (err: any) {
          err.statusCode = 400;
          done(err, undefined);
        }
      }
    );
  };
}

const bs = new Bootstrap();
bs.buildContainer().then(() => {
  return bs.start();
});
