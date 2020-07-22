const m = require("mithril");
const { Browser } = require("./components/browser");
const Editor = require("./components/editor");
const { lightBlue } = require("./htmlconstants");
const div = "div";


const stylePage = () => /*css*/`
  .page {
    background: ${lightBlue};
    margin:0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  .container {
    width: 75%;
    margin: 0 auto;
    max-width: 960px;
    height: 100vh;
  }
`;

const view = function () {
  return [
    m("style", stylePage()),
    m(div, { class: "page" },
      m(div, { class: "container" }, [
        m(Browser),
        m(Editor)
      ])
    )];
};

module.exports = { view };


