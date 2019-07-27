# Artfest Patrimonios webapp

Progressive web app created with customElements using hyperhtml, redux and workbox.

## Description

A fast and responsive web application with full offline support

## Install packages

```
npm i
```

## Build targets
The default build targets browsers supporting ES Modules, and the legacy build targets old browsers.

The multi build creates a build with the two build targets where modules are loaded for newer browsers and an old version is created for older browsers.

## Develop locally

```
$ npm run start
$ npm run start:legacy
```

Start will run webpack-dev-server locally, and start:legacy will run with legacy code.

## Building Your Application

```
$ npm run build
$ npm run build:legacy
$ npm run build:multi
```

This will create a build of your application in the `dist/` directory, optimized to be served in production.

## Running Tests

```
$ npm run test
```
