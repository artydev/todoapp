const m = require("mithril");
const { Browser} = require("./components/browser");
const { Editor } = require("./components/editor");
const { lightBlue } = require("./htmlconstants");
const State = require("./state");
const div = "div";
console.log(State);

function App() {
  const classEditor = () => State.editorVisible ? "appEditorVisible" : "appEditorHidden";
  const view = function () {
    return [
      m("style", stylePage()),
      m(div, { class: "appPage" },
        m(div, { class: "appContainer" }, [
          m(Browser),
          m(div, { class: classEditor() }, m(Editor))
        ])
      )];
  };
  return { view };
}

module.exports = { App };

const stylePage = () => /*css*/`
  .appPage {
    background: ${lightBlue};
    margin:0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  .appContainer {
    width: 75%;
    margin: 0 auto;
    max-width: 960px;
    height: 100vh;
  }
  .appEditorVisible {
    display: block;
  }
  .appEditorHidden {
    display: none;
  }
`;
