import {
  InjectionMode,
  Lifetime,
  asClass,
  createContainer,
  AwilixContainer,
  asValue,
} from "awilix";
import process from "process";
import db from "../repository/interface/database";

export class DiContainer {
  private static instance: DiContainer;

  container: AwilixContainer;
  globs: string[];

  private constructor() {
    this.globs = this.setGlobs();
    this.container = this.make();
  }

  static getInstance(): DiContainer {
    if (!DiContainer.instance) {
      DiContainer.instance = new DiContainer();
    }

    return DiContainer.instance;
  }

  private setGlobs(): string[] {
    return [`core/**/*.js`, `user/**/*.js`].map(
      (dir) => process.env.SERVER_DIST_DIR + dir
    );
  }

  make() {
    this.container = createContainer().loadModules(this.globs, {
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,
        injectionMode: InjectionMode.CLASSIC,
      },
    });
    this.container.register("db", asValue(db));
    return this.container;
  }

  public getContainer(): AwilixContainer {
    return this.container;
  }
}

export default DiContainer.getInstance();
