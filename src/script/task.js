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
    $("#editorjs").css("display", "block");
    $(".default-view").css("display", "none");
  } else {
    $("#editorjs").css("display", "none");
    $(".default-view").css("display", "flex");
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
  // button-project
  if ($(e.target).hasClass("btn-project")) {
    for (let i = 0; i < $(".btn-project").length; i++) {
      $(`.btn-project:eq(${i})`).removeClass("project-active");
    }
    $(e.target).addClass("project-active");
    await renderBlock();
  }

  // setting menu button
  if ($(e.target).hasClass("setting-project")) {
    showProjectMenu(e);
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
  await editor.configuration.saveBlock(data);
  await editor.clear();
  await updateUI();
  for (let i = 0; i < $(".btn-project").length; i++) {
    if ($(`.btn-project:eq(${i})`).attr("data-blockId") == data.blockId) {
      $(`.btn-project:eq(${i})`).addClass("project-active");
    } else {
      $(`.btn-project:eq(${i})`).removeClass("project-active");
    }
  }
  checkBlockActive();
}

async function updateUI() {
  const username = $(".username-container").attr("data-username");
  const result = await editor.configuration.getAllBlock(username);
  const allBlock = JSON.parse(result);
  let htmlElements = "";
  if (allBlock.length <= 0) {
    $("#editorjs").css("display", "none");
    $(".default-view").css("display", "flex");
    return $(".projects").html(htmlElements);
  }

  $("#editorjs").css("display", "block");
  $(".default-view").css("display", "none");
  allBlock.forEach((block) => {
    htmlElements += `
      <button class="btn btn-project" role="button" data-blockId=${block.block_id}>
          <div class="contents">
              <img src="../assets/tutor-1.svg" alt="" width="20">
              <span class="title">${block.block_title}</span>
          </div>
          <iconify-icon icon="solar:menu-dots-bold" width="20" height="20" class="setting-project" data-title=${block.block_title} data-blockId=${block.block_id}></iconify-icon>
      </button>    
    `;
    $(".projects").html(htmlElements);
  });
  checkBlockActive();
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

async function updateTitle(blockId, blockTitle) {
  const data = {
    blockId,
    blockTitle,
    username: $(".username-container").attr("data-username"),
  };
  await editor.configuration.updateTitle(data);
}

async function deleteBlock(blockId) {
  const data = {
    blockId,
    username: $(".username-container").attr("data-username"),
  };
  await editor.configuration.deleteBlock(data);
}

function checkBlockActive() {
  const children = $(".projects").has(".project-active");
  if (children.length > 0) {
    editor.render(JSON.parse(blocksData.blocks_data));
    $("#editorjs").css("display", "block");
    $(".default-view").css("display", "none");
  } else {
    $("#editorjs").css("display", "none");
    $(".default-view").css("display", "flex");
  }
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

function showProjectMenu(event) {
  const blockId = event.target.getAttribute("data-blockId");
  const blockTitle = event.target.getAttribute("data-title");

  Swal.fire({
    input: "text",
    inputValue: blockTitle,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Change Title",
    denyButtonText: `Remove this project`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      // change title
      await updateTitle(blockId, result.value);
      await updateUI();
    } else if (result.isDenied) {
      // remove project
      await deleteBlock(blockId);
      await updateUI();
    }
  });
}
