module.exports = {
    roots: [
        '<rootDir>/src/client',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        "^.+\\.scss$": 'jest-scss-transform',
    },
    testRegex: '/__tests__/.*\\.test\\.tsx?$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ]
};