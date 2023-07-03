# firefox-relay-folders

A browser extension for Firefox that allows you to use folders on the Firefox Relay page (https://relay.firefox.com/accounts/profile/).

# Installation

https://addons.mozilla.org/en-US/firefox/addon/relay-folders/

# About

This extension allows you to use folders and tags by saving their data in the email masks name. This limits the extension in the following ways:
- you need to **manually save** the folders and tags (by setting the masks name to the displayed text) and
- you are limited to an overall amount of **50 characters** for the masks name including the folder and tag information.
To apply tag and folder settings a page-reload is required.

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

## extension/js/dist/content.js

The TypeScript source files are under ```src/content``` and ```src/shared``` and the config files are under ```config/content```.

Build script:

```shell
npm run build_wp_content
```

## extension/js/dist/popup.js

The TypeScript source files are under ```src/popup``` and ```src/shared``` and the config files are under ```config/popup```.

Build script:

```shell
npm run build_wp_popup
```

## extension/js/dist/background.js

The TypeScript source files are under ```src/background``` and ```src/shared``` and the config files are under ```config/background```.

Build script:

```shell
npm run build_wp_background
```
