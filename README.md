# firefox-relay-folders

A browser extension for Firefox that allows you to use folders on the Firefox Relay page (https://relay.firefox.com/accounts/profile/).

# Installation

https://addons.mozilla.org/en-US/firefox/addon/relay-folders/

# Build instructions

System requirements:

- Node v18.13.0
- npm 9.7.1

Install the required npm packages:

```shell
npm install
```

Run the build script to build everything:

```shell
npm run build
```

Or build single parts:

## extension/js/content.js

The TypeScript source files are under ```src/content``` and the config files are under ```config/content```.

Build script:

```shell
npm run build_wp_content
```

## extension/js/popup.js

The TypeScript source files are under ```src/popup``` and the config files are under ```config/popup```.

Build script:

```shell
npm run build_wp_popup
```
