const m = require("mithril");
const state = require("../state");

function changeStateName () {
  state.name = Math.random();
}

module.exports = {
  name: "Sesam Editor",
  view: () => m("h1", {onclick: changeStateName}, "Editor " + state.name)
};
