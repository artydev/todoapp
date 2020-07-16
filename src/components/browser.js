const m = require("mithril");
const state = require("../state");

module.exports =  {
  name: "Browser",
  view:  () => m("h1", `Browser ${state.name}`)
};