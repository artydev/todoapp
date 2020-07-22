const m = require("mithril");
const State = require("../state");
const UtilFs = require("../utils/files");
const { fileSVG, dirSVG } = require("../assets/svgicons");
const { div, style } = require("../htmlconstants");

/* css region */
const szHead = "1.95rem";
const cssPage = { class: "bnPage" };
const cssContainer = { class: "bnContainer" };
const cssTitle = { class: "bnTitle bnH1" };


function styleBrowser() {
  const darkblue = "rgba(60, 69, 134, 1)";
  const mediumblue = "rgba(60, 69, 134, 0.46)";
  const lightblue = "rgba(244, 248, 255, 1)";
  return /*css*/`
    body { margin: 0;box-sizing: content-box; background: ${lightblue}; color: ${darkblue};}


    ul {margin:0; padding:0; list-style: none;}
    .conteditor {width: 75%; margin: 0 auto;}
    .headfic {display: flex; justify-content: space-between;line-height: 3rem;}
    .lineitem {border-bottom: 1px solid ${mediumblue};display:flex; align-items:center; height: 45px; justify-content: space-between;}
    .bnPage {background:${lightblue};margin: 0;padding: 0;width: 100%;height: 100%;}
    .bnContainer {width: 75%;margin: 0 auto;max-width: 960px;height: 100vh;border-top: 0;border-bottom:0;}
    .bnTitle {text-align: center;font-size: ${szHead};font-weight: bold;font-family: "Segoe UI";color: ${darkblue};
    }
  `;
}
/* css region end */

function handleFile (file) {
  if (file.type == "dir") {
    State.browser.currentDir = file.filepath;
    m.redraw();
    return;
  }
}

async function initBrowser() {
  let fsReady = await UtilFs.initFileSystem();
  fsReady && console.log("FileSystemReady");
  let listFiles = await UtilFs.listFileSystem("/notes");
  let filesStat = await UtilFs.getAllFilesStat(listFiles);
  console.log(filesStat);
  return filesStat;
}

const fileItem = (file) => {
  const dateCreation = new Date(file.mtimeMs);
  const fileName = file.filepath.split("/").slice(-1)[0];
  const svgIcon = (type) => type == "dir" ? dirSVG() : fileSVG();
  return [
    m("li.lineitem", { onclick: () => handleFile(file) }, [
      m("", { style: "display:flex; align-items:center; cursor:pointer" },
        m.trust(svgIcon(file.type)),
        m("", fileName)
      ),
      m("", dateCreation.toLocaleDateString())
    ])];
};

const CurrentPath = function () {
  const view = () => m("", State.browser.currentDir);
  return { view };
};

const FoldersDisplay = function () {
  let  files = State.browser.filesCurrentDir;
  return {
    view : () => m("ul", files.map(fileItem)) 
  };
};

const Browser = function () {
  let listRep = null;
  return {
    oninit: async () => {
      console.log("init");
      listRep = await initBrowser();
      State.browser.currentDir = "/notes";
      State.browser.filesCurrentDir = listRep;
      m.redraw();
    },
    view: () => [
      m(style, styleBrowser()),
      m(div, cssPage,
        m(div, cssContainer, [
          m(div, cssTitle, "Bloc Notes"),
          m(CurrentPath),
          listRep && m(FoldersDisplay)
        ]))
    ]
  };
};

exports.Browser = Browser;