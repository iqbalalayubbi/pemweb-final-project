const formData = document.getElementById("form-data");

const editor = new EditorJS({
  onReady: async () => {
    new DragDrop(editor);
    editor.render(loadBlock());
  },
  onChange: (api, event) => {
    setTimeout(() => {
      saveBlock();
    }, 3000);
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
});

const KEY = "SECRET";
function saveBlock() {
  console.log("save data");
  editor
    .save()
    .then((blocksData) => {
      const allBlock = JSON.stringify(blocksData);
      localStorage.setItem(KEY, allBlock);
      //   formData.submit();
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
  // save data to local storage
  // store from local storage to database
}

function loadBlock() {
  const allBlock = JSON.parse(localStorage.getItem(KEY));
  return allBlock;
}

formData.addEventListener("submit", (event) => {
  event.preventDefault();
});

function sendData() {
  $.ajax({
    type: "POST",
    url: "data.php",
    data: { number: 10 },
    success: function (data) {
      alert(data);
    },
  });
}
