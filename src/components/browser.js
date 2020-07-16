const m = require("mithril");
const { ActionBar } = require("./actionbar");
const { h1 } = require("../htmlconstants");

const Browser = function () {
  return {
    view: () => [
      m(h1, "File Browser"),
      m(ActionBar)
    ]
  };
};

exports.Browser = Browser;