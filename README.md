# RxReactNestjsTestingAndDebugging

![ci](https://github.com/miking-the-viking/nx-react-nestjs-testing-and-debugging/workflows/ci/badge.svg)

> A dive into testing and debugging React and NestJs in an Nx Workspace.

This application is setup to demonstrated some core concepts to testing and debugging a fullstack monorepository TypeScript application (React and NestJs).

## Getting Started

> Refer to [Applications](#applications) to see the included back end and front end applications.
>
> -   [Web](#web) - React
> -   [Api](#api) - NestJs
>
> Refer to [Libraries](#libraries) to see the included supporting reusable libraries
>
> Refer to [Tools]($tools) to see the included supporting dev tools

## Applications

### web

The `web` application is the Web-based UI front end (React).

The expected features entail:

-   [ ] Facilitate some stupid easy authentication
-   [ ] Some functionality

These features must all be thoroughly tested.

#### Commands

-   `yarn start web` - will start serving the React application at `localhost:4200` and will live reload on any detected file changes
-   `yarn test web` - will perform a one time test run of the React application
    -   `yarn test web --watch` - will start all the React application tests in watch mode
-   `yarn e2e web-e2e` - will perform a one time Cypress test run
    -   `yarn e2e web-e2e --watch` - will engage the Cypress UI to stay open and watch for file changes

> Note: Cypress tests are a bastard to get working right on Windows at present, some improvements are expected for WSL2 that should make the experience mimic Linux.

### api

The `api` application is the NodeJs server back end(NestJs).

The expected features entails:

-   [ ] Authentication via GQL
-   [ ] Restricted routes exposing some functionality

These features must all be thoroughly tested.

#### Commands

-   `yarn start api` - will start serving the NestJs application at `localhost:4200` and will live reload on any detected file changes
-   `yarn test api` - will perform a one time test run of the NestJs application
    -   `yarn test api --watch` - will start all the NestJs application tests in watch mode

## Libraries

## Tools

# Best Practices

## Continuous Integration

The CI pipeline uses GitHub Actions to execute all the necessary basic steps/checks on the given pull request before it can be merged.

Refer to `.github/workflows/ci.yml` for reference.

Using a custom GitHub Access Token on a valid user's behalf can be used in te reporting action to comment the coverage report on the related PR.

This also allows for you to get this sweet ass badge! ![ci](https://github.com/miking-the-viking/nx-react-nestjs-testing-and-debugging/workflows/ci/badge.svg)

# [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

-   [React](https://reactjs.org)
    -   `npm install --save-dev @nrwl/react`
-   Web (no framework frontends)
    -   `npm install --save-dev @nrwl/web`
-   [Angular](https://angular.io)
    -   `npm install --save-dev @nrwl/angular`
-   [Nest](https://nestjs.com)
    -   `npm install --save-dev @nrwl/nest`
-   [Express](https://expressjs.com)
    -   `npm install --save-dev @nrwl/express`
-   [Node](https://nodejs.org)
    -   `npm install --save-dev @nrwl/node`

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@king/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
