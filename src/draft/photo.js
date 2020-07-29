/* eslint-disable no-undef */

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
  return users.results[0].picture.medium;
}

// eslint-disable-next-line no-unused-vars
let editor = new Jodit("#editor", {
  buttonsSM: ["bold", {
    text: "Photo",
    exec: async function (editor) {
      const id = genId.next().value;
      editor.s.insertHTML(`<span id=${id}></span>`);
      m.render(document.getElementById(id), m("div", "wait...."));
      let photo = await getPhoto();
      m.render(document.getElementById(id), m("img", { src: photo }));

    }
  }],
  enter: "div",
  language: "fr",
});

