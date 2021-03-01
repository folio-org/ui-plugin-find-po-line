const commonCofig = require('@folio/stripes-acq-components/jest.config');

module.exports = {
  ...commonCofig,
  testMatch: ['**/FindPOLine/**/?(*.)test.{js,jsx}'],
  collectCoverageFrom: [
    '**/FindPOLine/**/*.{js,jsx}',
    '!**/node_modules/**',
  ],
};
