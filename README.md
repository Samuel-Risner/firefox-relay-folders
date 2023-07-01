# browser-extension-template

A template for creating a browser extension (Firefox).

# Setup

To use this template you should reset/set some stuff:

## manifest.json

- set "name" to your extensions name
- set "description"
- set "homepage_url" to your repos readme

## package.json

- change the "name" to your extensions/repos name
- change the "description"
- under "repository" change the "url" to your repos name
- change "author" to your name
- under "bugs" change "url" to your repos
- change "homepage" to your repos readme

## package-lock.json

Delete this file and then run:

```shell
npm install
```

## LICENSE

- change the whole thing

or

- change the name
- change the date

## Remove .gitignore files

- extension/css/dist/
- extension/js/dist/
- extension/icons/

# How to add another content script (or something else that you want to build separately):

- decide on a name (```<name>```)
- go to the ```config``` folder
    - create a new folder with the name ```<name>```
    - copy ```tsconfig.json```, ```webpack.config.js``` and optionally ```tailwind.config.cjs``` from another folder to the newly created folder (```<name>```)
    - enter the newly created folder (```<name>```)
        - in ```tsconfig.json``` change:
            - ```"include": ["../../src/<name>/**/*.ts"],```
        - in ```webpack.config.js``` change:
            - ```entry: path.resolve(__dirname, "..", "..", "src", "<name>", "index.ts"),```
            - ```filename: "<name>.js",```
        - in ```tailwind.config.cjs``` change:
            - ```content: ["src/<name>/**/*.ts"],``` or
            - ```content: ["src/<name>/**/*.ts", "extension/html/<name>.html],"``` if you require an html file
- go to the ```extension``` folder
    - add your html file (if you have/need one) ```<name>.html``` to the folder ```html``` (you can use your script by using ```<script type="text/javascript" src="js/dist/<name>.js"></script>``` and your css by using: ```<link href="css/dist/<name>.css" rel="stylesheet">```)
    - add your script (and css) to the ```manifest.json``` file (you can link your script by using: ```js/dist/<name>.js``` and css by using ```css/dist/<name>.css```)
- go to the ```src``` folder
    - add the folder ```<name>``` and enter it
        - create the file ```index.ts``` inside that folder
- if you added a TailwindCSS config file:
    - go to the ```tw``` folder
    - create a new file called ```<name>.css```
    - add the contents of another file in that directory to the newly created file
- go to the ```package.json``` file and add the following scripts:
    - ```"build_wp_<name>": "webpack --config config/<name>/webpack.config.js",```
    - ```"watch_wp_<name>": "webpack --config config/<name>/webpack.config.js --watch",```
    - ```"build_tw_<name>": "tailwindcss -c ./config/<name>/tailwind.config.cjs -i ./tw/<name>.css -o ./extension/css/dist/<name>.css --minify",```
    - ```"watch_tw_<name>": "tailwindcss -c ./config/<name>/tailwind.config.cjs -i ./tw/<name>.css -o ./extension/css/dist/<name>.css --watch",```
    - also add the newly created script to the ```build``` script
