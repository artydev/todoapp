"use strict";

const UtilFs = require("./utils/files");

const m = require("mithril");


const  { App } = require("./app.js");

UtilFs.initFileSystem().then(() => {
  // eslint-disable-next-line no-undef
  m.mount(bn, App);
});


