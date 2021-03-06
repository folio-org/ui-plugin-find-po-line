# Change history for ui-plugin-find-po-line

## (IN PROGRESS)

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
