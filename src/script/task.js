import { Block } from "./Block.js";
import { tools } from "./configuration.js";

$(".btn-project:eq(0)").addClass("project-active");

const editor = new Block(
  {
    onReady: () => {
      new DragDrop(editor);
      new Undo({ editor });
    },
    placeholder: "Enter your task...",
    holder: "editorjs",
    tools,
  },
  updateBlock
);

window.addEventListener("load", renderBlock);

$(".btn-add").click(createBlock);
$(".btn-project").click(setActive);
$(".projects").click(setActive);
$(".btn-logout").click(confirmLogout);

async function renderBlock() {
  await editor.isReady;
  const blockId = $(".project-active").attr("data-blockId");
  const username = $(".username-container").attr("data-username");
  const blocksData = await editor.configuration.renderBlock(blockId, username);
  if (blocksData) {
    editor.render(JSON.parse(blocksData.blocks_data));
  }
}

function createBlock() {
  Swal.fire({
    title: "Enter the title project",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Save",
  }).then((result) => {
    if (result.isConfirmed) {
      const blockTitle = result.value;
      saveBlock(blockTitle);
    }
  });
}

async function setActive(e) {
  if ($(e.target).hasClass("btn-project")) {
    for (let i = 0; i < $(".btn-project").length; i++) {
      $(`.btn-project:eq(${i})`).removeClass("project-active");
    }
    $(e.target).addClass("project-active");
    await renderBlock();
  }
}

async function saveBlock(blockTitle) {
  await editor.isReady;
  const blocksData = await editor.save();
  const data = {
    blockId: Math.floor(Math.random() * Date.now()).toString(16),
    blockTitle,
    blocksData: JSON.stringify(blocksData),
    username: $(".username-container").attr("data-username"),
    createdAt: moment().format("YYYY-MM-DD HH-mm-ss"),
  };
  console.log(data.createdAt);
  await editor.configuration.saveBlock(data);
  await editor.clear();
  await updateUI();
  for (let i = 0; i < $(".btn-project").length; i++) {
    console.log();
    if ($(`.btn-project:eq(${i})`).attr("data-blockId") == data.blockId) {
      $(`.btn-project:eq(${i})`).addClass("project-active");
    } else {
      $(`.btn-project:eq(${i})`).removeClass("project-active");
    }
  }
}

async function updateUI() {
  const username = $(".username-container").attr("data-username");
  const result = await editor.configuration.getAllBlock(username);
  const allBlock = JSON.parse(result);
  let htmlElements = "";
  allBlock.forEach((block) => {
    htmlElements += `
      <button class="btn btn-project" role="button" data-blockId=${block.block_id}>
          <img src="../assets/tutor-1.svg" alt="" width="30">
          ${block.block_title}
      </button>
    `;
    $(".projects").html(htmlElements);
  });
}

async function updateBlock() {
  const blocksData = await editor.save();
  const data = {
    blockId: $(".project-active").attr("data-blockId"),
    blocksData: JSON.stringify(blocksData),
    username: $(".username-container").attr("data-username"),
    createdAt: moment().format("YYYY-MM-DD HH-mm-ss"),
  };
  await editor.configuration.updateBlock(data);
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
