const m = require("mithril");
const { div, button } = require("../htmlconstants");

const ActionBar = function () {
  return {
    view: () => m(div, [
      m(button, "createdir"),
      m(button, "removedir"),
      m(button, "createfile"),
      m(button, "removefile"),
    ])
  };
};

exports.ActionBar = ActionBar;