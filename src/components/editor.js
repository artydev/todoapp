const m = require("mithril");
const State = require("../state");

module.exports = {
  name: "Sesam Editor",
  view: () => State.editorVisible && m("h1", "Show Editor")
};
