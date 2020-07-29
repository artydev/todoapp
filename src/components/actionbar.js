const m = require("mithril");
const { style, div, button } = require("../htmlconstants");
const UtilFs = require("../utils/files");
const State = require("../state");


const ActionBar = function () {
  return {
    view: () => m(div, { class: "abBarre" }, [
      m(style, styleActionBar()),
      m(div, { class: "abHeader" },
        isRootDir() && m(button, options["createRep"], "Nouveau répertoire"),
        (!isRootDir() && !State.editorVisible) && m(button, options["createFile"], "Nouveau fichier"),
        State.editorVisible && [
          m(button, options["saveFile"], "Enregistrer"),
          m(div, State.edition.currentfile)        
        ]
      )])
  };
};

exports.ActionBar = ActionBar;

const options = {
  "createRep": { class: "abButton", onclick: createRep },
  "createFile": { class: "abButton", onclick: createFile },
  "saveFile": { class: "abButton", onclick: saveFile },
};

const isRootDir = () => State.browser.currentDir == "/notes";


async function refreshBrower() {
  let files = await UtilFs.readDir(State.browser.currentDir);
  let fstats = await UtilFs.getAllFilesStat(files);
  State.browser.filesCurrentDir = fstats;
  m.redraw();
}

function createRep() {
  // eslint-disable-next-line no-undef
  Jodit.Prompt("Nom du répertoire : ", async function (dirname) {
    await UtilFs.mkDirectory(dirname);
    await refreshBrower();
  });
}

function createFile() {
  // eslint-disable-next-line no-undef  
  Jodit.Prompt("Nom du fichier : ", async function (filename) {
    await UtilFs.createFile(filename);
    await refreshBrower();
  });
}

function saveFile () {
  const content = State.editor.getEditorValue();
  const fileName =  State.edition.currentfile;
  UtilFs.createFile(fileName, content);
}

const styleActionBar = () => /*css*/`
  .abButton {
    background: orange;
    border: none;
    padding:0;
    margin-right: 5px;
    border: 1px solid orange;
    padding: 5px;
    border-radius: 5px;
    font-size: 10px;
  }
  .abBarre {
    margin:0;
    padding:0;    
    margin-top: 5px;
    margin-bottom: 4px;
  }
  .abHeader {
    display: flex;
  }
  .jodit-dialog__content {
    min-height: 0px !important;
  }
 .jodit-dialog__header{
   height: 40px !important;
  }`;
