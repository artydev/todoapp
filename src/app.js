const m = require("mithril");
require("./css/style.css");
const State = require("./state");
const Browser = require("./components/browser.js");
const Editor = require("./components/editor.js");

const view = function () {
  return [
    m(Browser),
    State.editorVisible && m(Editor)
  ];
};

module.exports = { view: view };
