# Change history for ui-plugin-find-po-line

## (5.2.0 IN PROGRESS)

* Align the `finance.fund` interface version (`3.0`). Refs UIPFPOL-68.

## [5.1.1](https://github.com/folio-org/ui-plugin-find-po-line/tree/v5.1.1) (2024-04-18)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v5.1.0...v5.1.1)

* Update the order lines query with location filtering to include the `searchLocationIds` field. Refs UIPFPOL-72.
* Add additional order filters to support reporting requirements. Refs UIPFPOL-71.

## [5.1.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v5.1.0) (2024-03-19)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v5.0.0...v5.1.0)

* Add Donor Filter for POLines. Refs UIPFPOL-65.
* Fix date range-related filters due to sending dates as an Array while the expected result must be in String. Refs UIPFPOL-66.

## [5.0.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v5.0.0) (2023-10-12)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v4.0.0...v5.0.0)

* Optimize query when selecting a fund for po lines. Refs UIPFPOL-57.
* Upgrade `Node.js` to `18` version in GitHub Actions. Refs UIPFPOL-59.
* *BREAKING:* Upgrade `React` to `18` version. Refs UIPFPOL-58.
* *BREAKING* bump `react-intl` to `v6.4.4`. Refs UIPFPOL-60.
* Add filter by linked package PO Line for order lines filters. Refs UIPFPOL-61.

## [4.0.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v4.0.0) (2023-02-17)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v3.3.0...v4.0.0)

* *BREAKING*: Upgrade `react-redux` to `v8`. Refs UIPFPOL-54.
* Support `inventory` interface version `13.0`. Refs UIPFPOL-52.
* *BREAKING*: Update `@folio/stripes` to `8.0.0`. Refs UIPFPOL-53.

## [3.3.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v3.3.0) (2022-10-21)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v3.2.0...v3.3.0)

* Find a purchase order line - Implement MCL Next/Previous pagination. Refs UIPFPOL-48.
* Add version 12.0 for `inventory` interface. Refs UIPFPOL-50.

## [3.2.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v3.2.0) (2022-07-07)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v3.1.0...v3.2.0)

* Fund and Expense class filters usage from stripes-acq-components. Refs UIPFPOL-41.
* Date filter search results do not match "Date created" period specified. Refs UIPFPOL-42.
* Replace `babel-eslint` with `@babel/eslint-parser`. Refs UIPFPOL-44.

## [3.1.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v3.1.0) (2022-03-02)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v3.0.1...v3.1.0)

* Select 'Acquisition method' filter from controlled vocabulary list. Refs UIPFPOL-33.
* Update expense class filter to support multi-select. Refs UIOR-870.
* Filter orders lines by export date. Refs UIPFPOL-38.
* Plugin should include "Search by" select list. Refs UIPFPOL-34.

## [3.0.1](https://github.com/folio-org/ui-plugin-find-po-line/tree/v3.0.1) (2021-11-11)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v3.0.0...v3.0.1)

* Expense class filter shows only 10 expense classes despite a longer list in the tenant. Refs UIPFPOL-31.

## [3.0.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v3.0.0) (2021-10-05)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v2.4.1...v3.0.0)

* Add POL price to search plugin-display in invoices app. Refs UIPFPOL-25.
* Increment stripes to v7. Refs UIPFPOL-24.
* Filter label contains extra "s". Refs UIPFPOL-28.
* Add interface version for inventory optimistic locking. Refs UIPFPOL-29.

## [2.4.1](https://github.com/folio-org/ui-plugin-find-po-line/tree/v2.4.1) (2021-07-30)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v2.4.0...v2.4.1)

* The data is not sorted alphabetically in the "Title or package name" column in the look-up window POL. Refs UIPFPO-21.
* The data is not displayed in the "Vendor reference number" column in the look-up window POL. Refs UIPFPOL-22.

## [2.4.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v2.4.0) (2021-06-17)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v2.3.1...v2.4.0)

* Filter order lines by Expense class. Refs UIOR-678.
* Compile Translation Files into AST Format. Refs UIPFPOL-19.
* Support cross index queries for GET /orders/order-lines endpoint. Refs UIPFPOL-20.

## [2.3.1](https://github.com/folio-org/ui-plugin-find-po-line/tree/v2.3.1) (2021-04-13)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v2.3.0...v2.3.1)

* Fund code and Location filters not working for POL search. Refs UIPFPOL-17.

## [2.3.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v2.3.0) (2021-03-15)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v2.2.1...v2.3.0)

* upgrade to stripes v6.
* UI tests replacement with RTL/Jest. Refs FAT-46.
* Add personal data disclosure form. Refs UIPFPOL-13.

## [2.2.1](https://github.com/folio-org/ui-plugin-find-po-line/tree/v2.2.1) (2020-11-10)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v2.2.0...v2.2.1)

* fix tests timeouts, translations

## [2.2.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v2.2.0) (2020-10-09)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v2.1.0...v2.2.0)

### Stories
* upgrade to stripes v5
* [UISACQCOMP-3](https://issues.folio.org/browse/UISACQCOMP-3) Handle import of stripes-acq-components to modules and platform

## [2.1.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v2.1.0) (2020-06-11)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v2.0.0...v2.1.0)

### Stories
* [UIOR-564](https://issues.folio.org/browse/UIOR-564) Ability to provide default filters in plugin
* [UIORGS-178](https://issues.folio.org/browse/UIORGS-178) Redirect API calls from mod-organizations-storage to mod-organzations
* [UIPFPOL-9](https://issues.folio.org/browse/UIPFPOL-9) ui-plugin-find-po-line: Update to Stripes v4

## [2.0.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v2.0.0) (2020-03-13)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v1.2.0...v2.0.0)

* bump the @folio/stripes peer to v3.0.0

### Stories

* [FOLIO-2436](https://issues.folio.org/browse/FOLIO-2436) folio-testing build failure w/interface mismatch (organizations-storage/orders)
* [UIPFPOL-5](https://issues.folio.org/browse/UIPFPOL-5) Security update eslint to >= 6.2.1 or eslint-util >= 1.4.1
* [MODORDERS-354](https://issues.folio.org/browse/MODORDERS-354) Divide the interface into smaller ones
* [UIPFPOL-7](https://issues.folio.org/browse/UIPFPOL-7) TECH-DEBT refactor ui-plugin-find-po-line to not use ui-orders
* [UIPFPOL-4](https://issues.folio.org/browse/UIPFPOL-4) Update inventory okapiInterface to version `10.0`. Part of UIPFPOL-4.

## [1.2.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v1.2.0) (2019-12-04)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v1.1.0...v1.2.0)

* fetch new translations

## [1.1.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v1.1.0) (2019-09-11)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-po-line/compare/v1.0.0...v1.1.0)

* [UIOR-349](https://issues.folio.org/browse/UIOR-349) find-po-line plugin cannot search at all

## [1.0.0](https://github.com/folio-org/ui-plugin-find-po-line/tree/v1.0.0) (2019-07-19)

* Initial release
* [UINV-24](https://issues.folio.org/browse/UINV-24) Search and select POL plugin
* [UIOR-320](https://issues.folio.org/browse/UIOR-320) single select support
