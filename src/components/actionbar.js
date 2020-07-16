const m = require("mithril");
const { div } = require("../htmlconstants");

const ActionBar = function () {
  return {
    view: () => m(div, "Action Bar")
  };
};

exports.ActionBar = ActionBar;