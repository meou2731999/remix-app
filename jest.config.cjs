// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest', // For non-TypeScript files
        '^.+\\.js?$': 'babel-jest', // For non-TypeScript files
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(@web3-storage)/)', // Adjust this pattern to include specific modules
    ],
    "setupFilesAfterEnv": ["@testing-library/jest-dom"],

};
