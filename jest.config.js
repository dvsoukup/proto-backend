module.exports = {
  preset: "ts-jest",
  // transform: {
  //   '^.+\\.tsx?$': 'esbuild-jest'
  // },
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
};
