const State = require("../state");
const DBName = "sesamdb";
const LightningFS = require("@isomorphic-git/lightning-fs");
const fs = new LightningFS();
let pfs;

function initDatabase() {
  if (State.browser.razDB) {
    console.log("RAZ Database");
    window.indexedDB.deleteDatabase(DBName);
  }
  fs.init(DBName);
  pfs = fs.promises;
}

async function initFileSystem() {
  initDatabase();
  try {
    await mkDirectory("Visites");
    console.log("visites created");
    await mkDirectory("Personnelles");
    console.log("personnelles created");
    await mkDirectory("Etablissement");
    console.log("etablissements created");
    await mkDirectory("Pieces_jointes");
    console.log("pieces jointes created");
    await mkDirectory("A_Propos");
    console.log("about created");
    await writeAboutFile();
    console.log("write about file");
  }
  catch (e) {
    console.log("Répertoire existants....");
  }
  return true;
}

async function existNotes() {
  let lsRoot = await pfs.readdir("/");
  return lsRoot.includes("notes");
}

async function writeAboutFile () {
  await pfs.writeFile("/notes/A_Propos/about.txt", "About...", "utf8");
}

async function mkDirectory(path = "") {
  let notesExist = await existNotes();
  if (!notesExist) {
    await pfs.mkdir("/notes");
  }
  await pfs.mkdir(`/notes/${path}`);
}

module.exports = {
  initFileSystem: initFileSystem,

  /* Doc */
  async readDir (path) {
    return await pfs.readdir(path);
  },

  async readFile (file) {
    console.log("reading file... : " + file.filepath);
    return await pfs.readFile(file.filepath, "utf8");
  },

  async getFileStat(filepath) {
    const res = await pfs.stat(filepath);
    return { ...res, filepath };
  },

  async getAllFilesStat(files = []) {
    const currentDir = State.browser.currentDir;
    const stats = await Promise.all(files.map(async (file) => {
      return await this.getFileStat(`${currentDir}/${file}`);
    }));
    return stats;
  },

  async listFileSystem(path = "") {
    return await pfs.readdir(path);
  }
};