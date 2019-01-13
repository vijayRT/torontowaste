# Shopify Web Engineer Intern Challenge

This repository serves as the codebase of my submission for Shopify Web Engineer Challenge. The submitted site is currently running at: https://vijayrt.github.io/torontowaste/

## Details:

 The site has been designed using Nuxt.js, a framework built on top of Vue.js for SPA support.

* The **index** page is located at: pages/index.vue

* The **static** folder contains the given input data, the cleaned up version of the input data, the keyword index, and a couple of svg files for the icons used on the site.

* The **assets** folder contains jsongen.js, the Javascript file responsible for cleaning up the input data and generating the posting list for indexing the keywords.

* The **tests** folder contains the test suite for the site, written using AVA.

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
