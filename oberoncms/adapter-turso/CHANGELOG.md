# @oberoncms/adapter-turso

## 0.8.0

### Minor Changes

- 26d9c91: Updated adapter-vercel-postgres for site config and version support
- 26d9c91: Added site manager page and page data migration functionality
- 26d9c91: BREAKING CHANGE changed sqlite columns storing json data to use new mode

### Patch Changes

- Updated dependencies [26d9c91]
- Updated dependencies [26d9c91]
- Updated dependencies [26d9c91]
  - @oberoncms/core@0.7.0

## 0.7.0

### Minor Changes

- c6960f3: Implement Adapter Plugins
  Refactor OberonProvider
  Add cleanup for uploadthing image removal
- 2deb902: Added updatedAt and updatedBy to images
  Resolved uploadingthing type declaration error
- eae691f: CAUTION BREAKING CHANGE
  databases created before this patch will need to be manually updated
  added updatedAt and updatedBy cloumns
  reset the drizzle database migrations
- 4e6430b: Reverted to relative imports because typescript team refuses to transpile declaration files

### Patch Changes

- c6960f3: Fixing adapter plugin
- 25bb5bf: Bump packages, improve View Page validation
- Updated dependencies [c6960f3]
- Updated dependencies [c6960f3]
- Updated dependencies [2deb902]
- Updated dependencies [eae691f]
- Updated dependencies [4e6430b]
- Updated dependencies [a5e6827]
- Updated dependencies [25bb5bf]
  - @oberoncms/core@0.6.0

## 0.6.0

### Minor Changes

- 77f07d0: Added Vercel Postgres adapter

### Patch Changes

- fcff95c: Bump nextauth version
- Updated dependencies [fcff95c]
  - @oberoncms/core@0.5.1

## 0.5.0

### Minor Changes

- eec8abb: Move auth to core

### Patch Changes

- Updated dependencies [eec8abb]
- Updated dependencies [d251149]
  - @oberoncms/core@0.5.0

## 0.4.1

### Patch Changes

- 7e7aa38: Fix dependencies and server loading of rich-text
- Updated dependencies [7e7aa38]
  - @oberoncms/auth@0.4.1
  - @oberoncms/core@0.4.1

## 0.4.0

### Minor Changes

- d4f6a5b: Publish dependant packages

### Patch Changes

- Updated dependencies [d4f6a5b]
  - @oberoncms/auth@0.4.0
  - @oberoncms/core@0.4.0

## 0.3.0

### Minor Changes

- dd9dc69: Implement optimistic pages
- 39b03d3: Optimistically update the ui for oberon users
- 5a0a961: Update theme
  Propogate theme to preview iframe
  Correctly invalidate server side cache on page mutate
  Add createPage oberon action
  Add example dashboard to recipe (maybe remvoe later?)
- e10807b: Impliment role based authorization

### Patch Changes

- Updated dependencies [dd9dc69]
- Updated dependencies [39b03d3]
- Updated dependencies [5a0a961]
- Updated dependencies [e10807b]
  - @oberoncms/core@0.3.0
  - @oberoncms/auth@0.3.0

## 0.2.0

### Minor Changes

- 63a21a9: Implemented Uploadthing Image Component.
  Next -> 14.2.
  Fixed turbo dev to correctly build dependencies.
  Changed from assets to images - this is a breaking change for oberon adapaters.
  Fixed dynamic tailwind to target preview iframe.

### Patch Changes

- Updated dependencies [63a21a9]
  - @oberoncms/core@0.2.0

## 0.1.0

### Minor Changes

- a38fe03: Initial publish

### Patch Changes

- Updated dependencies [a38fe03]
  - @oberoncms/core@0.1.0
