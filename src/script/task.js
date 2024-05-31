const formData = document.getElementById("form-data");
const tools = {
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
    class: window.ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      defaultColor: "#FFBF00",
      type: "marker",
      icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
    },
  },
  raw: RawTool,
  embed: Embed,
  code: CodeTool,
  AnyButton: {
    class: AnyButton,
    inlineToolbar: false,
    config: {
      css: {
        btnColor: "btn--gray",
      },
      textValidation: (text) => {
        console.log("error!", text);
        return true;
      },
      linkValidation: (text) => {
        console.log("error!", text);
        return false;
      },
    },
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+W",
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
  Color: {
    class: window.ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: [
        "#EC7878",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#0070FF",
        "#03A9F4",
        "#00BCD4",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFF",
      ],
      defaultColor: "#FF1300",
      type: "text",
      customPicker: true, // add a button to allow selecting any colour
    },
  },
};

const editor = new EditorJS({
  onReady: async () => {
    new DragDrop(editor);
    editor.render(loadBlock());
    new Undo({ editor });
  },
  onChange: (api, event) => {
    setTimeout(() => {
      saveBlock();
    }, 3000);
  },
  placeholder: "Enter your task...",
  holder: "editorjs",
  tools,
  i18n: {
    messages: {
      tools: {
        AnyButton: {
          "Button Text": "ボタンに表示するテキスト",
          "Link Url": "ボタンの飛び先のURL",
          Set: "設定する",
          "Default Button": "デフォルト",
        },
      },
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

function confirmLogout(event) {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "logout.php";
    } else if (result.isDenied) {
      window.location.href = "logout.php";
    }
  });
}
