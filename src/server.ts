import { config as envConfig } from "dotenv";
envConfig();
import colors from "colors";
import Fastify, { FastifyInstance } from "fastify";
import process from "process";
import { AwilixContainer } from "awilix";
import diContainer from "./core/infrastructure/container";

import v1Routes from "./core/http/routes";

class Bootstrap {
  container: AwilixContainer;
  server: FastifyInstance;
  port: number;

  constructor() {
    this.server = Fastify({});
    this.container = diContainer.make();
    this.port = Number(process.env.SERVER_PORT);
  }

  start = async () => {
    try {
      this.registerRoutes();
      await this.server.listen(this.port);

      const address = this.server.server.address();
      let msg = [
        colors.rainbow("*****************************************"),
        "",
        `${colors.green("Server started")}`,
        "",
        `${colors.green("Navigate to -")} ${colors.cyan(
          "http://localhost:" + this.port + "/api/v1/status"
        )}`,
        "",
        colors.rainbow("*****************************************"),
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

new Bootstrap().start();
