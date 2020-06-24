import {
  clickable,
  collection,
  fillable,
  interactor,
  is,
  property,
  scoped,
} from '@bigtest/interactor';

import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import {
  ButtonInteractor,
} from '@folio/stripes-acq-components/test/bigtest/interactors';

@interactor class OrderLinesFilterInteractor {
  static defaultScope = '#uiPluginFindPOLine--paneset';

  searchInput = fillable('[data-test-plugin-search-input]');
  searchButton = new ButtonInteractor('[data-test-plugin-search-submit]');
  receiptStatusAwaiting = scoped('#accordion1', CheckboxInteractor);
  resetAll = new ButtonInteractor('#clickable-reset-all');
}

@interactor class PluginModalInteractor {
  static defaultScope = '[data-test-find-records-modal]';

  instances = collection('[data-row-inner]', {
    click: clickable(),
    selectLine: scoped('[data-test-checkbox]', CheckboxInteractor),
  });

  save = scoped('[data-test-find-records-modal-save]', {
    click: clickable(),
    isDisabled: property('disabled'),
  });

  selectAll = scoped('[data-test-find-records-modal-select-all]', {
    click: clickable(),
  });
}

@interactor class FindPOLineInteractor {
  button = scoped('[data-test-plugin-find-record-button]', {
    click: clickable(),
    isFocused: is(':focus'),
  });

  modal = new PluginModalInteractor();
  filter = new OrderLinesFilterInteractor();

  whenLoaded() {
    return this.timeout(5000).when(() => this.modal.instances.isPresent);
  }
}

export default FindPOLineInteractor;
