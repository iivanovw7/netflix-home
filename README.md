## netflix-home

Will contain netflix-like browse page.

---
### Table of Contents

- [Requirements](#requirements)
- [Libs](#libs)
- [Clone](#clone)
- [Installation](#installation)
- [Development](#development)
- [Configuration](#configuration)
- [Files](#files)
- [ToDo](#todo)
- [License](#license)

---
### Requirements

- [NodeJS 16.15.1](https://nodejs.org/en/)
- [PNPM 7.x](https://pnpm.io/)

---
### Libs

Technologies used
- [React](https://reactjs.org/)
- [Mobx](https://mobx.js.org/README.html)
- [Mobx-state-tree](https://mobx-state-tree.js.org/intro/welcome)
- [postcss](https://github.com/postcss/postcss)
- [Jest](https://jestjs.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org)
- [stylelint](https://stylelint.io)

---
### Clone

- Clone repository: <br />
  `git clone https://github.com/iivanovw7/netflix-home.git` <br />

---
### Installation

- Install node, npm and yarn. <br />
  `npm install --global pnpm`
- Navigate into the application directory <br />
  `cd netflix-home` <br />
- Installing setup modules: <br />
  `pnpm install` <br />

---
### Development

- Running in dev mode: <br />
  `pnpm run dev` <br />
- Create production build: <br />
  `pnpm run build` <br />
- Serve last production build <br />
  `pnpm run view` <br />
- Create jsdoc in `build/doc` <br />
  `pnpm run doc` <br />
- Lint `*.pcss`, `*.css` and `*.js` project files: <br />
  `pnpm run lint` <br />
- Lint `*.pcss`, `*.css` project files: <br />
  `pnpm run lint-css` <br />
- Lint `*.ts`, `*.tsx`, `*.js`, `*.jsx` project files: <br />
  `pnpm run lint-eslint` <br />
- Update simple git hooks after config changes <br />
  `npx simple-git-hooks` <br />
- Run all tests <br />
  `pnpm run test` <br />
- Run all tests with coverage report <br />
  `pnpm run coverage` <br />
-
---
### Configuration


Additional arguments could be added to `pnpm run dev`, or `pnpm run build` after `--`:
* `--source-maps` {string | false} [true] - creates [source maps](https://webpack.js.org/configuration/devtool/).
* `--trace-deprecation` {string | false} [false] - enables deprecation warnings.
* `--port` {string} - override application default port (for `dev` or `view` script).

Additional arguments could be added to `pnpm run build`:
* `--stats` {string | boolean} [false] - creates `stats.html` file inside `./build` folder.

Additional arguments could be added to `test` or `coverage` scripts.
* `--verbose` - add verbose cli report during run.
* `--watch` - execute test run in `watch` mode.

Examples:
* `pnpm run build -- --source-maps=true`
* `pnpm run build -- --stats`
* `pnpm run dev -- --trace-deprecation`
* `pnpm run view -- --port=9000`
* `pnpm run dev -- --port=9000`
* `pnpm run test -- --verbose --watch`

#### Application ports.

Application port could be set up via CLI (`pnpm run dev -- --port=999`).
Default ports `4466` and `4467` are going to be used otherwise (see `_/tool/env` file).

---
### Files

Contains information about main configuration files and folders.

`./.nvmrc` -- contains current `Node.js` version.

`./.stylelintrc.js` -- contains stylelint configuration.

`./assets` -- folder contains application resources (images, svg, fonts and etc...)

`./config/typedoc` -- contains JSDoc setup.

`./config/vite` -- contains webpack config files.

`./config/postcss` -- contains postcss config.

`./tool` -- contains additional scripts used during build, testing, debugging, etc.

`./src/` -- main application folder.

`./src/main.jsx` -- entry point, renders application.

`./src/app` -- initializing the application (context, providers, etc...).

`./src/pages` -- contains application pages.

`./src/pages/routing` -- contains application routing config.

`./src/shared` -- reusable infrastructure code (UIKit, libs, API, ...).

`./src/widgets` -- complex page widgets, composing the underlying layers.

---
### ToDo
- ~~Create base application structure.~~ <br/>
- ~~Setup vite for prod and dev, setup loaders and npm scripts.~~ <br/>
- ~~Setup linting~~ <br/>
- Test production view script. <br/>
- ~~Configure js/ts linter.~~ <br/>
- ~~Configure css linter.~~ <br/>
- Add global loader and spinner <br/>
- Setup unit tests <br />
- Setup integration tests <br />
- Setup e2e tests <br />
- Browse page: Header controls <br/>
- Browse page: Assets requests <br/>
- Browse page: Playable header <br/>
- Browse page: Base assets slider <br/>
- Browse page: Playable asset preview <br/>
- Player component & store slice <br />
- Refactor: Technical pages <br />
- Consider switching to [postcss-modules](https://www.npmjs.com/package/postcss-modules) <br />
  (see https://vitejs.dev/guide/features.html) <br />
- Replace Portal with Floating portal in modals <br />

### License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2022 © <a href="https://github.com/iivanovw7/netflix-home" target="_blank">netflix-home</a>


