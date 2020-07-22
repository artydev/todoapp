"use strict";

const UtilFs = require("./utils/files");

const m = require("mithril");


const App = require("./app.js");

UtilFs.initFileSystem().then(() => {
  m.mount(document.body, App);
});


/*
désactiver le cache du navigateur avec Live Server
*/