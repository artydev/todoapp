const m = require("mithril");
const State = require("../state");
const  { sleep } = require("../utils/tools");
const UtilFs = require("../utils/files");
const { div, darkblue, style, lightblue } = require("../htmlconstants");


/* css region */
const szHead = "1.95rem";
const stylePage = () => /*css*/`
  .bnPage {
    background:${lightblue};
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .bnContainer {
    width: 75%;
    border: 1px solid ${darkblue};
    margin: 0 auto;
    max-width: 960px;
    height: 100vh;
    border-top: 0;
    border-bottom:0;
  }
  .bnTitle {
    text-align: center;
    font-size: ${szHead};
    font-weight: bold;
    font-family: "Segoe UI";
    color: ${darkblue};
  }
`;
const cssPage = { class: "bnPage" };
const cssContainer = { class: "bnContainer" };
const cssTitle = {class: "bnTitle bnH1"};
/* css region end */


async function initDirectories () {
  await sleep(3000);
  const lsDir =  await State.pfs.readdir("/");
  console.log(lsDir.indexOf("notes") >= 0);
  return lsDir;
}

const Browser = function () {
  return {
    oninit: async () =>  { 
      UtilFs.initFileSystem();
      initDirectories().then((r) => console.log(r));
    },
    view: () => [
      m(style, stylePage()),
      m(div, cssPage,
        m(div, cssContainer, [
          m(div, cssTitle, "Bloc Notes!!")
        ]))
    ]
  };
};

exports.Browser = Browser;