module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'dist/coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
