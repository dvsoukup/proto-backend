import { DiContainer } from "./container";

describe("ContainerFactory", () => {
  let diInstance: DiContainer;

  beforeEach(() => {
    diInstance = DiContainer.getInstance();
  });

  it("Should not have a container defined until make is invoked", () => {
    expect(diInstance.container).toBeUndefined();
  });

  it("Should have a container defined after make is invoked", async () => {
    await diInstance.make();
    expect(diInstance.container).toBeDefined();
  });

  it("Should have proper globs set", () => {
    let result = diInstance.globs;
    expect(result).toContain("dist/core/**/*.js");
    expect(result).toContain("dist/players/**/*.js");
    expect(result).toHaveLength(2);
  });
});
