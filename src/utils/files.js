/* init pfs */
const assert = require("assert");
const State = require("../state");
const LightninFS = require("@isomorphic-git/lightning-fs");

module.exports = {
  initFileSystem() {
    let pfs = null;
    const fs = new LightninFS();
    pfs = fs.promises;
    assert(pfs, "erreur pfs");
    State.pfs = pfs;
    console.log(State.browser.currenRep);
  }
};