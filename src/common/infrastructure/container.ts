import { InjectionMode, Lifetime, asClass, createContainer, AwilixContainer } from 'awilix';
import process from 'process';

class ContainerFactory {
    container!: AwilixContainer;
    globs!: string[];

    constructor() {
        this.init();
    }

    private init(): void {
        this.globs = [
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
const containerFactory = new ContainerFactory();

export default containerFactory;