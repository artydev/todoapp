const m = require("mithril");
require("./css/style.css");
const State = require("./state");
const Browser = require("./components/browser.js");
const Editor = require("./components/editor.js");

function changeStateName() {
  State.name = Math.random().toString();
}

const view = function () {
  return [
    m("h1", "AppState : " + State.name),
    m("button", { onclick: changeStateName }, "change state name"),
    m(Browser),
    m(Editor)
  ];
};

module.exports = { view: view };
