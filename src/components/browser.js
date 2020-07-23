const m = require("mithril");
const State = require("../state");
const UtilFs = require("../utils/files");
const { fileSVG, dirSVG } = require("../assets/svgicons");
const { div, style, ul, darkblue, li } = require("../htmlconstants");
const AppTitle = "Bloc Notes";
const root = "/notes";

// eslint-disable-next-line no-undef
console.log(Jodit); 

let filesStats = [];

function updateCurrentPath(path) {
  State.browser.currentDir = path;
}

function showCurrenPath() {
  return m.trust(`<b>Répertoire :</b>  ${State.browser.currentDir}`);
}

function handleFile(file) {
  updateCurrentPath(file.filepath);
  if (file.type == "dir") {
    getFilesStats(file.filepath).then(m.redraw);
    return;
  }
  if (file.type == "file") {
    UtilFs.readFile(file).then(res => console.log(res));
    State.editorVisible = true;
  }
  m.redraw();
}

function displayRoot() {
  updateCurrentPath(root);
  getFilesStats(root).then(m.redraw);
}

const fileItem = (file) => {
  const dateCreation = new Date(file.mtimeMs);
  const fileName = file.filepath.split("/").slice(-1)[0];
  const svgIcon = (type) => type == "dir" ? dirSVG() : fileSVG();
  return [
    m(li, { class: "brlineitem", onclick: () => handleFile(file) }, [
      m(div, { class: "brlibitem" },
        m.trust(svgIcon(file.type)),
        m(div, {class: "brfilename"}, fileName)
      ),
      m(div, { class: "brdate" }, dateCreation.toLocaleDateString())
    ]),
  ];
};

let getFilesStats = async (dir) => {
  updateCurrentPath(dir);
  const fileNames = await UtilFs.readDir(dir);
  filesStats = await UtilFs.getAllFilesStat(fileNames);
  return filesStats;
};

const FoldersDisplay = function () {
  return {
    oninit: () => getFilesStats("/notes").then(f => { filesStats = f; m.redraw(); }),
    view: () => m(div,
      m(ul, { class: "brul" }, filesStats.map(fileItem)),
    )
  };
};

const styleBrowser = () => /*css*/`
  .brcontainer {
    font-family: "Segoe UI", Ubuntu; 
    color: ${darkblue};
    font-size: 0.985rem;
    line-height: 1.5;
    font-weight: 400;
  }
  .brtitle {
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    padding: 0;
    padding-top: 30px;
    margin-bottom: 30px;
  }
  .brdate {
    font-size: 0.92rem;
  }
  .brlineitem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(60, 69, 134, .23);
    cursor: pointer;    
  }
  .brlibitem {
    display: flex;
    cursor: pointer;
    margin:0;
    position: relative;
    top:2px;
  }
  .brul {
    margin: 0;
    margin-top: 10px;
    padding: 0;
  }
  .brcurpath {
    cursor: pointer;
  }
  .brfilename {
    font-size: 0.980rem;
    font-weight: 400;
  }
`;

const Browser = function () {
  const propsCurpath = {
    class: "brcurpath",
    title: "retour racine",
    onclick: displayRoot
  };
  return {
    view: () => [
      m(style, styleBrowser()),
      m(div, { class: "brcontainer" },
        m(div, { class: "brtitle" }, AppTitle),
        m(div, propsCurpath, showCurrenPath()),
        m(FoldersDisplay)
      ),
      m("hr"),
    ]
  };
};

exports.Browser = Browser;

