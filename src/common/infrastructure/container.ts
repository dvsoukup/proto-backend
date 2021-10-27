import { InjectionMode, Lifetime, asClass, createContainer, AwilixContainer } from 'awilix';
import process from 'process';

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
        return [
            `common/**/*.js`,
            `user/**/*.js`
        ].map(dir => process.env.SERVER_DIST_DIR + dir);
    }

    make() {
        this.container = createContainer()
            .loadModules(
                this.globs,
                {
                    resolverOptions: {
                        lifetime: Lifetime.SINGLETON,
                        register: asClass,
                        injectionMode: InjectionMode.CLASSIC
                    }
                });
        return this.container;
    }

    public getContainer(): AwilixContainer {
        return this.container;
    }
};

export default DiContainer.getInstance();