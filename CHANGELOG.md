# bedrock-jsonld-document-loader ChangeLog

## 5.2.0 - 2025-01-30

### Changed
- Update dependencies.
  - `jsonld-document-loader@2.3.0`.
    - Adds `clone()` function.

## 5.1.0 - 2024-07-31

### Changed
- Update dependencies.
  - `@digitalbazaar/http-client@4.1.1`.
  - `jsonld-document-loader@2.2.0`.
    - Adds `addDocuments()` function.
- Update linting and test dependencies.

## 5.0.0 - 2024-03-17

### Changed
- **BREAKING**: Add fetch options with default size and timeout limits
  (16 KiB and 5 seconds, respectively) for `httpHandlerClient`.

## 4.0.0 - 2023-09-18

### Changed
- **BREAKING**: Drop support for Node.js < 18.
- Use `@digitalbazaar/http-client@4`. This version requires Node.js 18+.
- Use `jsonld-document-loader@2`. This version requires Node.js 16+.

## 3.0.0 - 2022-04-28

### Changed
- **BREAKING**: Update peer deps:
  - `@bedrock/core@6`
  - `@bedrock/https-agent@4`.

## 2.0.2 - 2022-04-01

### Fixed
- Use `jsdoc-to-markdown@7`.

## 2.0.1 - 2022-04-01

### Fixed
- Update dependencies to latest for new major version 2.0.

## 2.0.0 - 2022-04-01

### Changed
- **BREAKING**: Rename package to `@bedrock/jsonld-document-loader`.
- **BREAKING**: Convert to module (ESM).
- **BREAKING**: Remove default export.
- **BREAKING**: Require node 14.x.

## 1.3.0 - 2022-03-28

### Changed
- Update peer deps:
  - `bedrock@4.5`
  - `bedrock-https-agent@2.3`.
- Update internals to use esm style and use `esm.js` to
  transpile to CommonJS.

## 1.2.2 - 2022-02-14

### Fixed
- Fix return value for `httpClientHandler.get()`.

## 1.2.1 - 2022-01-21

### Added
- Add additional tests.

## 1.2.0 - 2021-08-30

### Added
- Add an httpClient protocol handler for web documentLoaders.

## 1.1.0 - 2021-07-23

### Changed
- Update peer dependencies; use bedrock@4.

## 1.0.1 - 2019-11-13

### Changed
- Allow peer dependency of bedrock@3.

## 1.0.0 - 2019-10-21

- See git history for changes.
