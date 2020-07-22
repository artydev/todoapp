// Gestion de l'état de l'application

module.exports = {
  name: "State",
  editorVisible: false,
  browser: {
    rootNotes: "/notes",
    currentDir: "/notes",
    filesCurrentDir: [],
    initDirs: ["locales"," visites", "images"],
    dirToCreate: null,
    fileToCreate: null,
    razDB: true
  },
  // promised file system handler
  pfs: null 
};