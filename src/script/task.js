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
$(".search-project").on("input", searchProject);

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
  const htmlElements = `
    <div class="container-popup">
      <input id="title" class="swal2-input" placeholder="title" type="text">
      <input id="date" class="swal2-input" placeholder="status" type="date">
      <div style="display: flex; gap: 0.5em; justify-content: center; margin-top:0.5em">
          <input type="radio" id="todo" name="status" value="todo">
          <label for="todo">Todo</label>
          <input type="radio" id="in-progress" name="status" value="progress">
          <label for="in-progress">In Progress</label>
          <input type="radio" id="done" name="status" value="done">
          <label for="done">Done</label>
      </div>
    </div>    
  `;
  Swal.fire({
    title: "Enter the title project",
    // input: "text",
    html: htmlElements,
    showCancelButton: true,
    confirmButtonText: "Save",
    preConfirm: function () {
      return new Promise(function (resolve) {
        resolve({
          title: $("#title").val(),
          deadline: $("#date").val(),
          status: $("input[name='status']:checked").val(),
        });
      });
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      // const blockTitle = result.value.title;
      // await saveBlock(blockTitle);
      const blockData = result.value;
      await saveBlock(blockData);
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

async function saveBlock(blockData) {
  await editor.isReady;
  const blocksData = await editor.save();
  const data = {
    blockId: Math.floor(Math.random() * Date.now()).toString(16),
    blockTitle: blockData.title,
    blocksData: JSON.stringify(blocksData),
    username: $(".username-container").attr("data-username"),
    createdAt: moment().format("YYYY-MM-DD HH-mm-ss"),
    deadline: blockData.deadline || null,
    status: blockData.status || "todo",
  };

  // console.log(blockData);
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
      <button class="btn btn-project" role="button" data-blockId=${block.block_id} >
          <div class="contents">
              <img src="../assets/tutor-1.svg" alt="" width="20">
              <span class="title">${block.block_title}</span>
          </div>
          <iconify-icon icon="solar:menu-dots-bold" width="20" height="20" class="setting-project" data-title=${block.block_title} data-blockId=${block.block_id} data-status=${block.status} data-deadline=${block.deadline}></iconify-icon>
      </button>    
    `;
  });
  $(".projects").html(htmlElements);
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

async function updateProject(blockId, blockTitle, status, deadline) {
  const data = {
    blockId,
    blockTitle,
    username: $(".username-container").attr("data-username"),
    status,
    deadline,
  };
  await editor.configuration.updateProject(data);
}

async function deleteBlock(blockId) {
  const data = {
    blockId,
    username: $(".username-container").attr("data-username"),
  };
  await editor.configuration.deleteBlock(data);
}

async function searchProject() {
  // ambil semua component project
  await updateUI();
  const titleElements = $(".btn-project .contents span");
  const btnProject = $(".btn-project");
  const inputVal = $(".search-project").val();

  const projectFound = [];
  for (let i = 0; i < titleElements.length; i++) {
    if (titleElements.eq(i).text().toLowerCase().startsWith(inputVal)) {
      const dataProject = {
        id: btnProject.eq(i).attr("data-blockId"),
        title: titleElements.eq(i).text(),
        status: btnProject.eq(i).children().last().attr("data-status"),
        deadline: btnProject.eq(i).children().last().attr("data-deadline"),
      };
      projectFound.push(dataProject);
    }
  }

  let htmlElements = "";

  if (projectFound.length <= 0) {
    htmlElements =
      "<span style='color: red; font-weight: bold;'>Project not found</span>";
    return $(".projects").html(htmlElements);
  }

  projectFound.forEach((blockData) => {
    htmlElements += `
    <button class="btn btn-project" role="button" data-blockId=${blockData.id}>
        <div class="contents">
            <img src="../assets/tutor-1.svg" alt="" width="20">
            <span class="title">${blockData.title}</span>
        </div>
        <iconify-icon icon="solar:menu-dots-bold" width="20" height="20" class="setting-project" data-title=${blockData.title} data-blockId=${blockData.id} data-status=${blockData.status} data-deadline=${blockData.deadline}></iconify-icon>
    </button>    
  `;
  });
  $(".projects").html(htmlElements);
}

function checkBlockActive() {
  const children = $(".projects").has(".project-active");
  if (children.length > 0) {
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

// console.log(moment("2024-08-05", "YYYYMMDD").fromNow());
function popupmenuTemplate(blockData) {
  const statusValue = [
    {
      id: "todo",
      value: "todo",
      label: "Todo",
    },
    {
      id: "in-progress",
      value: "progress",
      label: "In Progress",
    },
    {
      id: "done",
      value: "done",
      label: "Done",
    },
  ];

  let radiosElemets = ``;
  for (let i = 0; i < statusValue.length; i++) {
    if (blockData.status == statusValue[i].value) {
      radiosElemets += `<input type="radio" id="${statusValue[i].id}" name="status" value="${statusValue[i].value}" checked>
      <label for="${statusValue[i].id}">${statusValue[i].label}</label>`;
    } else {
      radiosElemets += `<input type="radio" id="${statusValue[i].id}" name="status" value="${statusValue[i].value}">
      <label for="${statusValue[i].id}">${statusValue[i].label}</label>`;
    }
  }

  return `
  <div class="container-popup">
        <input id="title" class="swal2-input" placeholder="title" type="text" value=${blockData.title}>
        <input id="date" class="swal2-input" placeholder="status" type="date" value="${blockData.deadline}">
        <div style="display: flex; gap: 0.5em; justify-content: center; margin-top:0.5em">
            ${radiosElemets}
        </div>
    </div>`;
  // <input type="radio" id="todo" name="status" value="todo">
  // <label for="todo">Todo</label>
  // <input type="radio" id="in-progress" name="status" value="progress">
  // <label for="in-progress">In Progress</label>
  // <input type="radio" id="done" name="status" value="done">
  // <label for="done">Done</label>
}

function showProjectMenu(event) {
  const blockId = event.target.getAttribute("data-blockId");
  const blockTitle = event.target.getAttribute("data-title");
  const blockStatus = event.target.getAttribute("data-status");
  const blockDeadline = event.target.getAttribute("data-deadline");

  const blockData = {
    id: blockId,
    title: blockTitle,
    status: blockStatus,
    deadline: blockDeadline,
  };

  console.log(blockData);

  Swal.fire({
    html: popupmenuTemplate(blockData),
    // timer: 2000,
    showCancelButton: false,
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: "save change",
    denyButtonText: `Remove this project`,
    preConfirm: function () {
      return new Promise(function (resolve) {
        resolve({
          title: $("#title").val(),
          deadline: $("#date").val(),
          status: $("input[name='status']:checked").val(),
        });
      });
    },
  }).then(async (result) => {
    console.log(result);
    if (result.isConfirmed) {
      const { title, status, deadline } = result.value;
      // update project
      await updateProject(blockId, title, status, deadline);
      await updateUI();
    } else if (result.isDenied) {
      // remove project
      await deleteBlock(blockId);
      await updateUI();
    }
  });
}
