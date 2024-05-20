const editor = new EditorJS({
  onReady: () => {
    new DragDrop(editor);
  },
  onChange: (api, event) => {
    console.log("editor changed");
  },
  placeholder: "Enter your task...",
  holder: "editorjs",
  tools: {
    header: {
      class: Header,
      config: {
        placeholder: "Enter a header",
        levels: [1, 2, 3, 4],
        defaultLevel: 3,
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: "unordered",
      },
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    image: SimpleImage,
    Marker: {
      class: Marker,
    },
  },
  data: {
    time: 1716031395744,
    blocks: [
      {
        id: "QMs1Z71sMM",
        type: "paragraph",
        data: {
          text: "ini merupakan sebuah tugas yang harus diselesaikan<br>",
        },
      },
      {
        id: "F9lNPRLbGc",
        type: "header",
        data: { text: "Pengembangan Perangkaat Lunak 3", level: 3 },
      },
    ],
    version: "2.29.1",
  },
});

const KEY = "SECRET";
const formData = document.getElementById("form-data");
function saveData() {
  editor
    .save()
    .then((blocksData) => {
      allBlock = JSON.stringify(blocksData);
      localStorage.setItem(KEY, allBlock);
      //   formData.submit();
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
  // save data to local storage
  // store from local storage to database
}
