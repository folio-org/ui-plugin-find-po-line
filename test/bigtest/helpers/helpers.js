import { setupStripesCore } from '@folio/stripes/core/test';
import translations from '@folio/stripes-acq-components/translations/stripes-acq-components/en';
import prefixKeys from '@folio/stripes-acq-components/test/bigtest/helpers/prefixKeys';

import mirageOptions from '../network';
import PluginHarness from './PluginHarness';
import PluginHarnessSingleSelect from './PluginHarnessSingleSelect';

mirageOptions.serverType = 'miragejs';

export default function setupApplication({
  isSingleSelect,
  module,
  scenarios,
  hasAllPerms = true,
} = {}) {
  setupStripesCore({
    mirageOptions,
    scenarios,
    stripesConfig: { hasAllPerms },

    // setup a dummy app for the plugin that renders a harness.
    modules: [{
      type: 'app',
      name: '@folio/ui-dummy',
      displayName: 'dummy.title',
      route: '/dummy',
      module: module || (isSingleSelect ? PluginHarnessSingleSelect : PluginHarness),
    }],

    translations: {
      'dummy.title': 'Dummy',
      ...prefixKeys(translations, 'stripes-acq-components'),
    },
  });
}
