const stripesConfig = require('@folio/jest-config-stripes');
const acqConfig = require('@folio/stripes-acq-components/jest.config');

module.exports = {
  ...stripesConfig,
  setupFiles: [
    ...stripesConfig.setupFiles,
    ...acqConfig.setupFiles,
  ],
  testMatch: ['**/FindPOLine/**/?(*.)test.{js,jsx}'],
  collectCoverageFrom: [
    '**/FindPOLine/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/test/**',
  ],
};
