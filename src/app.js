const m = require("mithril");
require("./css/style.css");
require("./htmlconstants");
const Browser = require("./components/browser.js");
const Editor = require("./components/editor.js");
const { div } = require("./htmlconstants");


console.log(div);

const view = function () {
  return [
    m(Browser),
    m(Editor)
  ];
};



module.exports = { view: view };
