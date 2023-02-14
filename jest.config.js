module.exports = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/_tests_/.*|(\\.|/)(test|spec))\\.tsx?$',
	testPathIgnorePatterns: ['/node_modules/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testEnvironment: 'node',
	coverageDirectory: '<rootDir>/coverage',
	coverageProvider: 'babel',
	clearMocks: true,
	testTimeout: 15000,
	globals: {
		'ts-jest': {
			isolatedModules: true
		}
	}
};