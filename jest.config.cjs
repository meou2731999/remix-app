// jest.config.js
const esModules = ['@web3-storage', '@apollo'].join('|'); // Adjust this pattern to include specific modules

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
        `/node_modules/(?!${esModules})`
    ],
    "setupFilesAfterEnv": ['<rootDir>/jestSetup.js'],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/app/$1'
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
