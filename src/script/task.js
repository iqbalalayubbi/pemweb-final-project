import { Block } from "./Block.js";
import { tools } from "./configuration.js";
import { API_KEY } from "./key.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  getDatetime,
  getLocaleTime,
  getFullDate,
  getFullTime,
} from "./formatTime.js";
import { templateBlock } from "./templateElement.js";

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
$(".projects").click(clickProject);
$(".btn-logout").click(confirmLogout);
$(".search-project").on("input", searchProject);
$(".btn-ai").click(generateText);
$(".setting-project").click(showProjectMenu);
$("input[name='filter-status']").on("change", filterStatus);

async function filterStatus(event) {
  const statusTask = event.target.value;
  const username = $(".username-container").attr("data-username");
  if (statusTask !== "all") {
    const blocksData = await editor.configuration.getBlockByStatus(
      username,
      statusTask
    );
    await updateUI(null, blocksData);
  } else await updateUI();
}

async function generateResponseAI(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 10,
    temperature: 0.5,
    topP: 0.01,
    topK: 5,
  };

  const model = genAI.getGenerativeModel(
    { model: "gemini-1.5-flash" },
    generationConfig
  );

  const customPrompt = `${prompt}, jelaskan tanpa format markdown secara singkat usahakan dibawah 3 kalimat.`;
  const result = await model.generateContent(customPrompt);

  const response = await result.response;
  const text = response.text();
  return text;
}

async function generateText() {
  await editor.isReady;
  const currentBlock = editor.blocks.getCurrentBlockIndex();
  const blockData = editor.blocks.getBlockByIndex(currentBlock);
  // const newBlock = {
  //   type: "paragraph",
  //   data: {
  //     text: "ini dibuat dengan bantuan ai tanpa kamu ngetik ini bisa terjadi",
  //   },
  // };
  $(".loading-container").css("display", "block");
  blockData
    .save()
    .then(async (config) => {
      const promptUser = config.data.text;
      const response = await generateResponseAI(promptUser);
      const formatResponse = response.replace(/\n/g, "");

      const blockId = config.id;
      editor.blocks.update(blockId, {
        text: formatResponse,
      });
      await updateBlock();
    })
    .finally(() => {
      $(".loading-container").css("display", "none");
    });
}

async function renderBlock() {
  await editor.isReady;
  const blockId = $(".project-active").attr("data-blockId");
  const username = $(".username-container").attr("data-username");
  const blocksData = await editor.configuration.renderBlock(blockId, username);

  if (blocksData) {
    const { blocks_data, status } = blocksData;
    editor.render(JSON.parse(blocks_data));
    $(".sideNav-env-marker.dev").attr("data-status", status);
    $("#editorjs").css("display", "block");
    $(".default-view").css("display", "none");
  } else {
    $("#editorjs").css("display", "none");
    $(".default-view").css("display", "flex");
  }
  updateDeadline();
}

function createBlock() {
  // <input id="date" class="swal2-input" placeholder="status" type="date">
  const htmlElements = `
  <div class="container-popup">
      <input id="title" class="swal2-input" placeholder="title" type="text">
      <input id="datetime" class="swal2-input" placeholder="status" type="datetime-local">
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
          deadline: $("#datetime").val(),
          status: $("input[name='status']:checked").val(),
        });
      });
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const defaultDeadline = moment().format("YYYY-MM-DD HH-mm-ss");
      const { title, deadline, status } = result.value;
      const blockData = {
        title,
        deadline: deadline ? getDatetime(deadline) : defaultDeadline,
        status,
      };
      await saveBlock(blockData);
    }
  });
}

function updateDeadline() {
  const datetime = $(".project-active").attr("data-deadline");
  $(".date").html(getFullDate(datetime));
  $(".time").html(getFullTime(datetime));
  const taskStatus = $(".sideNav-env-marker.dev").attr("data-status");
  let statusBg = "#bc3c0e";
  switch (taskStatus) {
    case "todo":
      statusBg = "#bc3c0e";
      break;
    case "progress":
      statusBg = "#b9bc0e";
      break;
    default:
      statusBg = "#0ebc34";
      break;
  }
  $(".sideNav-env-marker.dev").css("background-color", statusBg);
}

async function setActive(id) {
  const btnProject = $(`.btn-project[data-blockId=${id}]`);
  for (let i = 0; i < $(".btn-project").length; i++) {
    $(`.btn-project:eq(${i})`).removeClass("project-active");
  }
  $(btnProject).addClass("project-active");
  await renderBlock();
}

async function clickProject(e) {
  const id = $(e.target.closest(".btn-project")).attr("data-blockId");
  await setActive(id);
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

async function updateUI(id = null, blocksData = null) {
  const username = $(".username-container").attr("data-username");
  const result = await editor.configuration.getAllBlock(username);
  const allBlock = JSON.parse(blocksData) || JSON.parse(result);

  let htmlElements = "";
  if (allBlock.length <= 0) {
    $("#editorjs").css("display", "none");
    $(".default-view").css("display", "flex");
    return $(".projects").html(htmlElements);
  }

  $("#editorjs").css("display", "block");
  $(".default-view").css("display", "none");
  allBlock.forEach((block) => {
    const { block_id, block_title, status, deadline } = block;
    const blockData = {
      id: block_id,
      title: block_title,
      status,
      deadline,
    };
    htmlElements += templateBlock(blockData);
  });
  $(".projects").html(htmlElements);
  checkBlockActive();
  await setActive(id);
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
  const btnProject = $(".btn-project");
  const inputVal = $(".search-project").val();

  const projectFound = [];
  for (let i = 0; i < btnProject.length; i++) {
    const title = btnProject.eq(i).attr("data-title");
    if (title.toLowerCase().startsWith(inputVal)) {
      const dataProject = {
        id: btnProject.eq(i).attr("data-blockId"),
        title,
        status: btnProject.eq(i).attr("data-status"),
        deadline: btnProject.eq(i).attr("data-deadline"),
      };
      projectFound.push(dataProject);
    }
  }

  let htmlElements = "";

  if (projectFound.length <= 0) {
    htmlElements =
      "<span style='color: red; font-weight: bold; display:flex; justify-content:center;padding-top:2em;'>Project not found</span>";
    return $(".projects").html(htmlElements);
  }

  projectFound.forEach(
    (blockData) => (htmlElements += templateBlock(blockData))
  );
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
        <input id="title" class="swal2-input" placeholder="title" type="text" value='${blockData.title}'>
        <input id="date" class="swal2-input" placeholder="status" type="datetime-local" value="${blockData.deadline}">
        <div style="display: flex; gap: 0.5em; justify-content: center; margin-top:0.5em">
            ${radiosElemets}
        </div>
    </div>`;
}

function showProjectMenu(event) {
  const projectActive = $(".project-active");
  const blockId = projectActive.attr("data-blockId");
  const blockTitle = projectActive.attr("data-title");
  const blockStatus = projectActive.attr("data-status");
  const blockDeadline = projectActive.attr("data-deadline");

  const blockData = {
    id: blockId,
    title: blockTitle,
    status: blockStatus,
    deadline: getLocaleTime(blockDeadline),
  };

  Swal.fire({
    html: popupmenuTemplate(blockData),
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
    if (result.isConfirmed) {
      const { title, status, deadline } = result.value;
      const deadlineFormat = getDatetime(deadline);
      // update project
      await updateProject(blockId, title, status, deadlineFormat);
      await updateUI(blockId);
    } else if (result.isDenied) {
      // remove project
      await deleteBlock(blockId);
      await updateUI();
    }
  });
}
