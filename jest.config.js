module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': require.resolve('./src/utils/__mocks__/style-mock.js')
  },
  setupFilesAfterEnv: ['./jest.setup.js']
};
