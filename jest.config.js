module.exports = {
  rootDir: "src",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/?!(react-avatar)"],
  moduleNameMapper: {
    "\\.(s?css)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: [
    "../node_modules/@testing-library/jest-dom/dist/index.js",
  ],
};
