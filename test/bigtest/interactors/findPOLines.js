import {
  interactor,
  scoped,
  collection,
  clickable,
  is,
  property,
} from '@bigtest/interactor';

@interactor class PluginModalInteractor {
  static defaultScope = '[data-test-find-po-line-modal]';

  instances = collection('[role=row] a', {
    click: clickable(),
  });

  save = scoped('[data-test-find-po-line-modal-save]', {
    click: clickable(),
    isDisabled: property('disabled'),
  });

  selectAll = scoped('[data-test-find-po-line-modal-select-all]', {
    click: clickable(),
  });
}

@interactor class FindPOLineInteractor {
  button = scoped('[data-test-plugin-find-po-line-button]', {
    click: clickable(),
    isFocused: is(':focus'),
  });

  modal = new PluginModalInteractor();

  whenLoaded() {
    return this.timeout(5000).when(() => this.modal.instances.isPresent);
  }
}

export default FindPOLineInteractor;
