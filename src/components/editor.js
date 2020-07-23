const m = require("mithril");
const State = require("../state");

function Editor() {
  return {
    oncreate: () => {
      // eslint-disable-next-line no-undef
      State.editor = new Jodit("#editor", {
        "buttons" : ["bold"],
        "extraButtons" :  ["info"]
      });      
    },
    view: ({attrs:{data}}) => m("div#editor", data)
  };
}

module.exports = {
  name: "Sesam Editor",
  Editor: Editor
};
