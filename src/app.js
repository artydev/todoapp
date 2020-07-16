const m = require("mithril");
const  { Browser } = require("./components/browser");
const Editor = require("./components/editor");
require("./css/style.css");

const view = function () {
  return [
    m(Browser),
    m(Editor)
  ];
};

module.exports = { view };
