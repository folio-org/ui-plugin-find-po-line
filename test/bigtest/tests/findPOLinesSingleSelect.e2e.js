import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/helpers';
import FindPOLineInteractor from '../interactors/findPOLines';

const LINES_COUNT = 15;

describe('Find PO Lines plugin with single select option', function () {
  const findPOLines = new FindPOLineInteractor();

  setupApplication({ isSingleSelect: true });

  beforeEach(async function () {
    this.server.createList('line', LINES_COUNT);
    this.visit('/dummy');
    await findPOLines.whenLoaded();
  });

  describe('Find order lines button', () => {
    it('should be rendered', function () {
      expect(findPOLines.button.isPresent).to.be.true;
    });

    describe('click action', function () {
      beforeEach(async function () {
        await findPOLines.button.click();
      });

      it('should open a modal', function () {
        expect(findPOLines.modal.isPresent).to.be.true;
      });
    });
  });

  describe('modal list', function () {
    beforeEach(async function () {
      await findPOLines.button.click();
      await findPOLines.filter.searchInput('TEST');
      await findPOLines.filter.searchButton.click();
    });

    it('should return a set of results', function () {
      expect(findPOLines.modal.instances().length).to.be.equal(LINES_COUNT);
    });

    describe('select a line (click on it)', function () {
      beforeEach(async function () {
        await findPOLines.modal.instances(1).click();
      });

      it('modal is closed', function () {
        expect(findPOLines.modal.isPresent).to.be.false;
      });
    });
  });
});
