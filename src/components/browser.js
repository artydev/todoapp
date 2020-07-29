const m = require("mithril");
const { ActionBar } = require("./actionbar");
const State = require("../state");
const UtilFs = require("../utils/files");
const { fileSVG, dirSVG, trashSVG } = require("../assets/svgicons");
const { div, style, ul, darkblue, li } = require("../htmlconstants");
const AppTitle = "Bloc Notes";
const root = "/notes";

/* Composant principal */
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
        m(div, { class: "brtitle" }, AppTitle), // à deplacer dans app
        m(div, propsCurpath, showCurrentPath()),
        m(ActionBar),
        m(FoldersDisplay)
      )
    ]
  };
};

exports.Browser = Browser;


/* Composant affichant les fichiers du répertoire courant */
const FoldersDisplay = function () {
  /* On affiche la liste des fichiers si aucun d'eux n'est selectionnés */
  const consultMode = () => {
    return !State.editorVisible;
  };
  return {
    oninit: () => getFilesStats("/notes").then(fstats => {
      State.browser.filesCurrentDir = fstats;
      m.redraw();
    }),
    view: () => m(div, { id: "fileslist" },
      consultMode() && m(ul, { class: "brul" }, State.browser.filesCurrentDir.map(fileItem)),      
    )
  };
};

/* Récupère les meta données d'un repertoire ou fichier */
let getFilesStats = async (dir) => {
  updateCurrentPath(dir);
  const fileNames = await UtilFs.readDir(dir);
  let filesStats = await UtilFs.getAllFilesStat(fileNames);
  return filesStats;
};

/* Composant affichant une ligne de fichier */
/* Les icônes dont affichées dynamiquement */
const fileName = (file) => file.filepath.split("/").slice(-1)[0];

const fileItem = (file) => {
  const dateCreation = new Date(file.mtimeMs);
  const svgIcon = (type) => type == "dir" ? dirSVG() : fileSVG();
  return [
    m(li, { class: "brlineitem" }, [
      m(div, { class: "brlibitem", onclick: (e) => handleFile(file, e) },
        m.trust(svgIcon(file.type)),
        m(div, { class: "brfilename" }, fileName(file))
      ),
      m(div, {style: "display: flex;align-items:center;"},
        [
          m("div", { class: "brdate" }, dateCreation.toLocaleDateString()),
          m("div", { class: "brtrashsvg" },  m.trust(trashSVG()))
        ]),    
    ]),
  ];
};

/* Met à jour l'indication du repértoire courant */
function updateCurrentPath(path) {
  State.editorVisible = false;
  State.browser.currentDir = path;
  State.edition.currentfile = "";
  m.redraw();
}

/* Affiche le répertoire courant */
function showCurrentPath() {
  return m.trust(`<b>Répertoire :</b>  ${State.browser.currentDir}`);
}

/* Excuter lors d'un click sur un fichier ou prepertoire */
function handleFile(file) {
  /* si repertoire */
  if (file.type == "dir") {
    State.browser.filesCurrentDir = [];
    m.redraw();
    //updateCurrentPath(file.filepath);
    getFilesStats(file.filepath).then((f) => {
      State.browser.filesCurrentDir = f;
      m.redraw();
    });
    return;
  }
  /*, si fichier */
  if (file.type == "file") {
    UtilFs.readFile(file).then(res => {
      State.edition.editmode = true;
      State.editorVisible = true;
      State.editor.setEditorValue(res);
      State.edition.currentfile = fileName(file);
      m.redraw();
    });
  }
  m.redraw();
}
/* Affiche le répertoire racine */
function displayRoot() {
  updateCurrentPath(root);
  getFilesStats(root).then((f) => {
    State.browser.filesCurrentDir = f;
    m.redraw();
  });
}

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
    padding: 0;
  }
  .brcurpath {
    cursor: pointer;
  }
  .brfilename {
    font-size: 0.980rem;
    font-weight: 400;
  }
  .brtrashsvg {
    width: 16px;
    height: 16px;
    fill: darkorange;
    position: relative;
    top: -2px;
    margin-left: 15px;
  }
`;
