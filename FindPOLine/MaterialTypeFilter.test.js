import { render } from '@folio/jest-config-stripes/testing-library/react';

import MaterialTypeFilter from './MaterialTypeFilter';

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Selection: ({ id, dataOptions }) => (
    <ul id={id}>
      {
        dataOptions.map((o) => <li>{o.label}</li>)
      }
    </ul>
  ),
}));

const mTypes = [
  { id: '001', name: 'mType #1' },
  { id: '002', name: 'mType #2' },
];

const renderMaterialTypeFilter = (
  isElectronic = false,
  materialTypes = mTypes,
) => (render(
  <MaterialTypeFilter
    id="mType"
    activeFilters={[]}
    name="mType"
    onChange={jest.fn}
    isElectronic={isElectronic}
    materialTypes={materialTypes}
  />,
));

describe('MaterialTypeFilter component', () => {
  it('should display title for electronic', () => {
    const { getByText } = renderMaterialTypeFilter(true);

    expect(getByText('ui-orders.filter.materialType.electronic')).toBeDefined();
  });

  it('should display title for physical', () => {
    const { getByText } = renderMaterialTypeFilter();

    expect(getByText('ui-orders.filter.materialType.physical')).toBeDefined();
  });

  it('should be closed by default', () => {
    const { getByLabelText } = renderMaterialTypeFilter();

    expect(getByLabelText('ui-orders.filter.materialType.physical filter list').getAttribute('aria-expanded') || 'false').toBe('false');
  });

  it('should render all passed options', async () => {
    const { findAllByText } = renderMaterialTypeFilter();

    const renderedFilterOptions = await findAllByText(/mType #[0-9]/);

    expect(renderedFilterOptions.length).toBe(mTypes.length);
  });
});
