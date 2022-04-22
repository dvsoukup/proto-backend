import {
  InjectionMode,
  Lifetime,
  asClass,
  createContainer,
  AwilixContainer,
  asValue,
  asFunction,
} from "awilix";
import process from "process";
// import db from "../repository/database";
import buildInMemoryDb from "../repository/inMemoryDatabase";

export class DiContainer {
  private static instance: DiContainer;

  container: AwilixContainer | undefined;
  globs: string[];

  private constructor() {
    this.globs = this.setGlobs();
    // this.container = this.make();
  }

  static getInstance(): DiContainer {
    if (!DiContainer.instance) {
      DiContainer.instance = new DiContainer();
    }

    return DiContainer.instance;
  }

  private setGlobs(): string[] {
    return [`core/**/*.js`, `players/**/*.js`].map(
      (dir) => process.env.SERVER_DIST_DIR + dir
    );
  }

  public async make(): Promise<AwilixContainer> {
    this.container = createContainer().loadModules(this.globs, {
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,
        injectionMode: InjectionMode.CLASSIC,
      },
    });
    let inMem = await buildInMemoryDb();
    this.container.register("db", asValue(inMem));
    return this.container;
  }

  public async getContainer(): Promise<AwilixContainer> {
    if (!this.container) {
      this.container = await this.make();
    }
    return this.container;
  }
}

export default DiContainer.getInstance();
