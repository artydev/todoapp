const m = require("mithril");
const  { Browser } = require("./components/browser");
const Editor = require("./components/editor");
const { container } = require("./htmlconstants");
require("./css/style.css");

const view = function () {
  return [
    m(container,
      m(Browser),
      m(Editor))
  ];
};

module.exports = { view };
