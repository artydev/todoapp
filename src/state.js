// Gestion de l'état de l'application

module.exports = {
  name: "State",
  editorVisible: false,
  browser: {
    rootNotes: "/notes",
    currenDir: "/notes",
    filesCurrentDir: [],
    initDirs: ["locales"," visites", "images"],
    dirToCreate: null,
    fileToCreate: null,
    
  },
  // promised file system handler
  pfs: null 
};