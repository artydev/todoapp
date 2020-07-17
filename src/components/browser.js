const m = require("mithril");
const LightninFS = require("@isomorphic-git/lightning-fs");
//const { ActionBar } = require("./actionbar");
const { h1, div, darkblue, mediumblue, lightblue } = require("../htmlconstants");

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
}


const cssPage = () => `
  background:${lightblue};
  margin:0;
  padding:0;
  width:100%;
  height:100vh;
`;

const cssContainer = () => `
  width: 75%;
  border: 1px solid ${darkblue};
  margin:0 auto;
  max-width: 960px;
  height: 100%;
  border-top: 0;
  border-bottom:0;
`;

const Browser = function () {
  return {
    oninit: () => initFileSystem(),
    view: () => [
      m(div, { style: cssPage() },
        m(div, { style: cssContainer() }, "File Browser"))
    ]
  };
};

exports.Browser = Browser;