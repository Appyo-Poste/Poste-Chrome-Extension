# Poste-Chrome-Extension
This chrome extension will serve as a companion to the mobile and web applications. Users will be able to login, create posts and folders, but viewing collections will be done via either the mobile or web application.

## Chrome Extension General Info
Chrome extensions are quite similar to web development. Development makes use of HTML, JavaScript, and CSS with the main diffrence being that Chrome extensions make use a manifest.json file that holds infomation about the files used by the extension. HTMl is used for the screens with CSS to help with styling, then JavaScript is use for the functionalty of the pages. This application uses TypeScript to enhance development through the use of types as well as shadcn for base components and tailwindcss for styling.

## Chrome Extension Development Tools
Chrome web browser for testing.

Any tool that can do HTML and JavaScript can be used for extension devlopment.

## Resoures 
[Google Getting Started Guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/) - provides info on loading extensions in devlopment mode and a few examples.

## Running:
You will need at least node v18

`nvm install 18`

`nvm use 18`

Your first time within the repo you'll need to:
`npm install` to install all dependencies within `node_modules`.
Then `npm run dev` to build a development version of `bundle.js`. If you have modified the css or haven't generated the output css file you'll also need to follow the tailwindcss build process below.

### Start the Tailwind CLI build process:
`npx tailwindcss -i ./src/styles/globals.css -o ./src/output.css --watch`

The `--watch` flag can be ommitted if not doing continuous development. 

### To build bundle.js:
`npm run build` to build for production
`npm run dev` to build for development

# To load within chrome
1. `npx tailwindcss -i ./src/styles/globals.css -o ./src/output.css`
2. `npm run dev`
3. Then, open Google Chrome, go to the Extensions page (`chrome://extensions`), and enable "Developer mode". Click on "Load unpacked extension" and navigate to the directory which houses this repo. The extension should now be loaded into Google Chrome, and you should be able to click on its icon in the toolbar to see your popup. Any updates to the code mean that you should bump the version within `manifest.json`