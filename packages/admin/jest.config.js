const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  rootDir: './', // ✅ 현재 `admin` 디렉토리를 루트로 설정
  moduleNameMapper: {
    '^@/utils/(.*)$': '<rootDir>/utils/$1', // ✅ Jest alias 추가
    '^@/test-utils$': '<rootDir>/utils/test-utils.tsx',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
