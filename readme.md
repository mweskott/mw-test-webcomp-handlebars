# Test Web Component for Homepage Search Backend (first template)

A web component created without any framework which uses Handlebars as HTML template engine.

Implements search frontend in a very basic way.

Uses static assest to simulate backend calls for results and suggestions.

## Build

    npm run build

Creates a web component js in folder `/dist`.

## Development

There is no dev mode implemented.
After code changes you have to build the component and reload the web page manually.

    npx http-server

Runs a local web server and exposes the `index.html` which includes the built web component.

## Used Libraries

### Handlebars

Simple template engine based on mustache interpolation.

https://handlebarsjs.com/

### Handlebars Loader 

A webpack loader to use handlebar template compilation at build time.

https://github.com/pcardune/handlebars-loader
