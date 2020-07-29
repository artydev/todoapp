const m = require("mithril");
const State = require("../state");


//https://www.npmjs.com/package/html-to-text
//exec command https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand

const apiusers = "https://randomuser.me/api/";

const genId = (
  function* genId() {
    let count = 0;
    while (true) {
      count += 1;
      yield count;
    }
  })();

async function getPhoto() {
  let users = await m.request(apiusers);
  return users.results[0];
}

const card = `
  width: 100px;
  text-align:center;
`;

const btnUser = {
  text: "RandomUser",
  exec: async function (editor) {
    const id = genId.next().value;
    editor.s.insertHTML(`<span id=${id}></span>`);
    m.render(document.getElementById(id), m("span", "recherche"));
    let user = await getPhoto();
    m.render(document.getElementById(id),
      m("div", {style: card},
        m("img", { src: user.picture.thumbnail }),
        m("", [
          m("span", user.name.first),
          m.trust("&nbsp;"),
          m("span", user.name.last)
        ]),
      )
    );
  }
};


const options = ["bold", "italic", "underline", "ul", "|", "image", btnUser, "fullsize", "undo", "redo"];

function Editor() {
  return {
    oncreate: () => {
      // eslint-disable-next-line no-undef
      State.editor = new Jodit("#editor", {
        buttons: options,
        buttonsMD: options,
        buttonsSM: options,
        buttonsXS: options,
        enter: "div",
        language: "fr",
        uploader: {
          insertImageAsBase64URI: true
        },
        imageDefaultWidth: 300,
        toolbarButtonSize: "small",
        style: {
          fontFamily: "Segoe UI, Ubuntu",
          fontSize: "12px",
         
        }
      });
    },
    view: ({ attrs: { data } }) => m("div#editor", data)
  };
}

module.exports = {
  name: "Sesam Editor",
  Editor: Editor
};
