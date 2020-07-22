exports.div = "div";
exports.h1 = "h1";
exports.li = "li",
exports.ul = "ul";
exports.button = "button";
exports.style = "style";

exports.darkblue = "rgba(60, 69, 134, 1)";
exports.mediumblue = "rgba(60, 69, 134, 0.46)";
exports.lightblue = "rgba(244, 248, 255, 1)";

exports.styleBrowser = function () {
  const darkblue = "rgba(60, 69, 134, 1)";
  const mediumblue = "rgba(60, 69, 134, 0.46)";
  const lightblue = "rgba(244, 248, 255, 1)";
  const szHead = "1.95rem";
  return /*css*/`
      body { margin: 0;box-sizing: content-box; background: ${lightblue}; color: ${darkblue};}
      ul {margin:0; padding:0; list-style: none;}
      .bnconteditor {width: 75%; margin: 0 auto;}
      .bnheadfic {display: flex; justify-content: space-between;line-height: 3rem;}
      .bnlineitem {border-bottom: 1px solid ${mediumblue};display:flex; align-items:center; height: 45px; justify-content: space-between;}
      .bnlibitem {display:flex; align-items:center; cursor:pointer}
      .bnPage {background:${lightblue};margin: 0;padding: 0;width: 100%;height: 100%;}
      .bnContainer {width: 75%;margin: 0 auto;max-width: 960px;height: 100vh;border-top: 0;border-bottom:0;}
      .bnTitle {text-align: center;font-size: ${szHead};font-weight: bold;font-family: "Segoe UI";color: ${darkblue};}
      .bnpath {cursor: pointer;};
      }
    `;
};