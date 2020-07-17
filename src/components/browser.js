const m = require("mithril");
const assert = require("assert");
const LightninFS = require("@isomorphic-git/lightning-fs");
//const { ActionBar } = require("./actionbar");
const { div, darkblue, lightblue } = require("../htmlconstants");


/* css region */
const szHead = "1.5rem";
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
    font-weight: 400;
    font-family: "Segoe UI", serif;
    color: ${darkblue};
  }
`;
const cssPage = { class: "bnPage" };
const cssContainer = { class: "bnContainer" };
const cssTitle = {class: "bnTitle bnH1"};
/* css region end */

/* directoty root */
//const root = "/notes";

/* current directory */
//let currentDir = root;

/* store promised file system */
let pfs = null;

/* store all files in current dir */
//let filesCurrenDir = [];

/* init pfs */
function initFileSystem() {
  const fs = new LightninFS();
  pfs = fs.promises;
  assert(pfs, "erreur pfs");
}

const Browser = function () {
  return {
    oninit: () =>  { initFileSystem(); },
    view: () => [
      m("style", stylePage()),
      m(div, cssPage,
        m(div, cssContainer, [
          m(div, cssTitle, "Bloc Notes")
        ]))
    ]
  };
};

exports.Browser = Browser;