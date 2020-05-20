import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/helpers';
import PluginHarnessInitialFilters from '../helpers/PluginHarnessInitialFilters';
import FindPOLineInteractor from '../interactors/findPOLines';

describe('Find PO Lines plugin with single select and initial filters', function () {
  const findPOLines = new FindPOLineInteractor();

  setupApplication({ module: PluginHarnessInitialFilters });

  beforeEach(async function () {
    this.server.create('line', { titleOrPackage: 'TEST', receiptStatus: 'Awaiting Receipt' });
    this.visit('/dummy');
    await findPOLines.button.click();
    await findPOLines.whenLoaded();
  });

  it('should return a set of results', function () {
    expect(findPOLines.modal.instances().length).to.be.equal(1);
  });

  it('has default filter checked', function () {
    expect(findPOLines.filter.receiptStatusAwaiting.isChecked).to.be.true;
  });

  describe('uncheck filter and click reset', function () {
    beforeEach(async function () {
      await findPOLines.filter.receiptStatusAwaiting.clickAndBlur();
      await findPOLines.filter.searchInput('TEST');
      await findPOLines.filter.searchButton.click();
      await findPOLines.filter.resetAll.click();
    });

    it('has filters selected after Reset', function () {
      expect(findPOLines.filter.receiptStatusAwaiting.isChecked).to.be.true;
    });
  });

  describe('select a line (click on it)', function () {
    beforeEach(async function () {
      await findPOLines.modal.instances(0).click();
    });

    it('modal is closed', function () {
      expect(findPOLines.modal.isPresent).to.be.false;
    });
  });
});
