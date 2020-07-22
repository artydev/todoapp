const m = require("mithril");
const State = require("../state");
const UtilFs = require("../utils/files");
const { fileSVG, dirSVG } = require("../assets/svgicons");
const { div, ul, style, li, styleBrowser } = require("../htmlconstants");

const AppTitle = "Bloc Notes";
const root = "/notes";

let filesStats = [];

function updatePath (path) {
  State.browser.currentDir = path;
}

function getCurrenPath () {
  return State.browser.currentDir;
}

function handleFile(file) {
  if (file.type == "dir") {
    updatePath(file.filepath);
    getFilesStats(file.filepath).then(m.redraw);
  }
}

function displayRoot () {
  updatePath(root);
  getFilesStats(root).then(m.redraw);
}

const fileItem = (file) => {
  const dateCreation = new Date(file.mtimeMs);
  const fileName = file.filepath.split("/").slice(-1)[0];
  const svgIcon = (type) => type == "dir" ? dirSVG() : fileSVG();
  return [
    m(li, { class: "bnlineitem", onclick: () => handleFile(file) }, [
      m(div, { class: "bnlibitem" },
        m.trust(svgIcon(file.type)),
        m(div, fileName)
      ),
      m(div, dateCreation.toLocaleDateString())
    ])];
};

let getFilesStats = async (dir) => {
  updatePath(dir);
  const fileNames = await UtilFs.readDir(dir);
  filesStats = await UtilFs.getAllFilesStat(fileNames);
  return filesStats;
};

const FoldersDisplay = function () {
  return {
    oninit: () => getFilesStats("/notes").then(f => { filesStats = f; m.redraw(); }),
    view: () => m(div,
      m(ul, filesStats.map(fileItem)),
    )
  };
};

const Browser = function () {
  return {
    view: () => [
      m(style, styleBrowser()),
      m(div, { class: "bnPage" },
        m(div, { class: "bnContainer" }, [
          m(div, { class: "bnTitle" }, AppTitle),
          m(div, {class: "bnpath", onclick: displayRoot}, getCurrenPath()),
          m(FoldersDisplay)
        ]))
    ]
  };
};

exports.Browser = Browser;

