// Gestion de l'état de l'application

module.exports = {
  name: "State",
  editor: null,
  editorVisible: false,
  edition: {
    currentfile: ""
  },
  browser: {
    rootNotes: "/notes",
    currentDir: "/notes",
    filesCurrentDir: [],
    razDB: false
  },
  // promised file system handler
  pfs: null 
};