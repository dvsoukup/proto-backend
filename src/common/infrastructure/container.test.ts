import { DiContainer } from "./container";

describe("ContainerFactory", () => {
  let diInstance: DiContainer;

  beforeEach(() => {
    diInstance = DiContainer.getInstance();
  });

  it("Should have a container defined", () => {
    expect(diInstance.container).toBeDefined();
  });

  it("Should have proper globs set", () => {
    let result = diInstance.globs;
    expect(result).toContain("dist/common/**/*.js");
    expect(result).toContain("dist/user/**/*.js");
    expect(result).toHaveLength(2);
  });
});
