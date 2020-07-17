/* init pfs */
const assert = require("assert");
const State = require("../state");
const LightningFS = require("@isomorphic-git/lightning-fs");

module.exports = {
  initFileSystem() {
    let pfs = null;
    const fs = new LightningFS();
    fs.init();
    pfs = fs.promises;
    assert(pfs, "erreur pfs");
    State.pfs = pfs;
  }
};