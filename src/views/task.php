<?php
session_start();

if (!isset($_SESSION["username"])) {
    header("Location:../views/login.php");
}

require_once "../model/Connection.php";
require_once "../model/Block.php";
$block = new Block();
$result = $block->getAllBlock($_SESSION["username"]);
$image = $_SESSION["image"] ? $_SESSION["image"] : "no-image.png";

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task</title>
    <!-- <link href="../output.css" rel="stylesheet"> -->
    <link href="../css/task.css" rel="stylesheet">

    <!-- latex -->
    <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.19.0/dist/editor.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/mdgaziur/EditorJS-LaTeX@latest/dist/editorjs-latex.bundle-min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mdgaziur/EditorJS-LaTeX@latest/dist/editorjs-latex.bundle.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css">
    </link>
</head>

<body>
    <div class="sideNav">
        <div class="sideNav-header">
            <div class="sideNav-header-settings">
                <img src="../uploads/<?= $image ?>" alt="" width="80" onclick="window.location.href = 'profile.php'">
                <div class="sideNav-header-title-user username-container" data-username="<?= $_SESSION['username'] ?>">@<?= $_SESSION["username"] ?></div>
            </div>
        </div>
        <div class="sideNav-env">
            <div class="sideNav-env-marker dev"></div>
        </div>
        <div style="display: flex; justify-content:center; align-items:center; color:white; gap:0.5em;">
            <div style="font-size: 0.5em;">
                <input type="radio" id="todo" name="filter-status" value="todo">
                <label for="todo">Todo</label>
            </div>
            <div style="font-size: 0.5em;">
                <input type="radio" id="progress" name="filter-status" value="progress">
                <label for="progress">Progress</label>
            </div>
            <div style="font-size: 0.5em;">
                <input type="radio" id="done" name="filter-status" value="done">
                <label for="done">Done</label>
            </div>
            <div>
                <input type="radio" id="all" name="filter-status" value="all">
            </div>
        </div>
        <div class="sideNav-section-dashboard projects">
            <?php foreach ($result as $block) : ?>
                <a class="sideNav-tab-container btn-project" data-blockId="<?= $block["block_id"] ?>" data-title="<?= $block["block_title"] ?>" data-status="<?= $block["status"] ?>" data-deadline="<?= $block["deadline"] ?>">
                    <div class="sideNav-tab">
                        <div class="sideNav-tab-icon-container">
                            <iconify-icon class="sideNav-tab-icon--dashboard" icon="solar:menu-dots-bold" style="display: inline-block; height: 1.5em; width: 1.5em; fill: currentcolor; user-select: none; vertical-align: text-top;"></iconify-icon>
                        </div>
                        <span class="sideNav-tab-title"><?= $block["block_title"] ?></span>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; margin-top: 1em; gap:1em;">
            <a class="sideNav-tab-container btn-add">
                <iconify-icon class="sideNav-tab-icon--dashboard" icon="majesticons:plus" width="15"></iconify-icon>
                <span>New Project</span>
            </a>
            <!-- button ask ai -->
            <button class="Btn btn-ai">
                <div class="sign">
                    <iconify-icon icon="streamline:ai-edit-spark" width="20"></iconify-icon>
                </div>
                <div class="text">ASK AI</div>
            </button>
            <div class="search-box">
                <button class="btn-search">
                    <iconify-icon icon="mynaui:search" width="24"></iconify-icon>
                </button>
                <input type="text" class="input-search search-project" placeholder="Find project...">
            </div>
        </div>
        <div class="bottom" style="position: absolute; bottom: 0; width: 100%; ">
            <div class="sideNav-clock clickable">
                <div class="clock-container">
                    <div class="clock">
                        <div class="date-time">
                            <div class="time">08:42
                            </div>
                            <div class="date">01 Sep</div>
                        </div>
                        <iconify-icon class="setting-project" icon="ic:round-edit-note" height="30" width="30"></iconify-icon>
                    </div>
                </div>
            </div>

            <a class="sideNav-tab-container btn-logout" style="background-color: brown;">
                <div class="sideNav-tab">
                    <div class="sideNav-tab-icon-container">
                        <iconify-icon class="sideNav-tab-icon--dashboard" icon="solar:logout-2-outline" style="display: inline-block; height: 1.5em; width: 1.5em; fill: currentcolor; user-select: none; vertical-align: text-top;"></iconify-icon>
                    </div>
                    <div class="sideNav-tab-title">Logout</div>
                </div>
            </a>
        </div>
    </div>

    <!-- <a class="sideNav-tab-container is-active" id="dropdownBtn">
                <div class="sideNav-tab dropdown" onclick="openDropdown()" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="sideNav-tab-icon-container">
                        <svg class="entypo--TextDocument sideNav-tab-icon--dashboard" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style="display: inline-block; height: 1em; width: 1em; fill: currentcolor; user-select: none; vertical-align: text-top;">
                            <path d="M16,1H4C3.447,1,3,1.447,3,2v16c0,0.552,0.447,1,1,1h12c0.553,0,1-0.448,1-1V2C17,1.448,16.553,1,16,1z M15,17H5V3h10V17z M13,5H7v2h6V5z M13,13H7v2h6V13z M13,9H7v2h6V9z">
                            </path>
                        </svg>
                    </div>
                    <div class="sideNav-tab-title">Fixtures
                        <svg class="dropBtn" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style="display: inline-block; height: 1em; width: 1em; fill: currentcolor;">
                            <path d="M4.516,7.548c0.436-0.446,1.043-0.481,1.576,0L10,11.295l3.908-3.747c0.533-0.481,1.141-0.446,1.574,0c0.436,0.445,0.408,1.197,0,1.615c-0.406,0.418-4.695,4.502-4.695,4.502C10.57,13.888,10.285,14,10,14s-0.57-0.112-0.789-0.335c0,0-4.287-4.084-4.695-4.502C4.107,8.745,4.08,7.993,4.516,7.548z">
                            </path>
                        </svg>
                    </div>
                    <div class="sideNav-tab dropdown-content" id="submenu">
                        <a href="#" class="sideNav-tab-title">Raw Fixtures</a>
                        <a href="#" class="sideNav-tab-title">Processed Fixtures</a>
                    </div>
                </div>
            </a> -->


    <!-- <div class="sideNav-clock clickable">
            <div class="clock-container">
                <div class="clock">
                    <iconify-icon class="icon" icon="mingcute:time-line" id="schedule" height="30" width="30"></iconify-icon>
                    <div class="date-time">
                        <div class="time">08:42
                        </div>
                        <div class="date">01 Sep</div>
                    </div>
                </div>
            </div>
        </div> -->
    <!-- <nav>
        <main>
            <div class="icon">Easy Task</div>
            <div class="profile">
                <img src="../assets/ilustration.svg" alt="" width="50">
                <span class="username-container" data-username="<?= $_SESSION['username'] ?>"><?= $_SESSION["username"] ?></span>
            </div>
            <h1 class="title">Projects</h1>
            <input type="text" class="search-project" placeholder="search project">
            <div class="projects">
                <?php foreach ($result as $block) : ?>
                    <button class="btn btn-project" role="button" data-blockId="<?= $block["block_id"] ?>">
                        <div class="contents">
                            <img src="../assets/tutor-1.svg" alt="" width="20">
                            <span class="title"><?= $block["block_title"] ?></span>
                        </div>
                        <iconify-icon icon="solar:menu-dots-bold" width="20" height="20" class="setting-project" data-title="<?= $block["block_title"] ?>" data-blockId="<?= $block["block_id"] ?>" data-status="<?= $block["status"] ?>" data-deadline="<?= $block["deadline"] ?>"></iconify-icon>
                    </button>
                <?php endforeach; ?>
            </div>
            <button class="btn btn-add" role="button">
                <img src="../assets/icons/add.svg" alt="" width="15">
                New Projcet
            </button>
            <button class="btn btn-ai" role="button">
                <img src="../assets/icons/add.svg" alt="" width="15">
                Ask AI
            </button>
        </main>

        <button class="btn btn-logout" role="button">
            <img src="../assets/icons/logout.svg" alt="" width="15">
            Logout
        </button>

    </nav> -->

    <div id="editorjs" class="editorjs-container"></div>
    <div class="default-view" style="display: flex;">
        <img src="../assets/default-view.png" alt="" width="300">
        <h1>Easy Task</h1>
        <h3>Make and Manage Your Project From Here</h3>
        <p>help anyone for create the best project that can be</p>
    </div>
    <div class="loading-container">
        <div class="spinner"></div>
    </div>

    <form method="post" id="form-data" class="hidden">
        <input type="hidden" name="blocks" value="">
        <!-- <button type="button" name="button" onclick="sendData()">Save Data</button> -->
    </form>

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!-- editor js files -->
    <script src="../library/editorjs.js"></script>
    <script src="../library/header.js"></script>
    <script src="../library/list.js"></script>
    <script src="../library/checklist.js"></script>
    <script src="../library/simple-image.js"></script>
    <script src="../library/marker.js"></script>
    <script src="../library/drag-drop.js"></script>
    <script src="../library/raw.js"></script>
    <script src="../library/embed.js"></script>
    <script src="../library/code.js"></script>
    <script src="../library/button.js"></script>
    <script src="../library/undo.js"></script>
    <script src="../library/warning.js"></script>
    <script src="../library/text-color.js"></script>

    <!-- new library -->
    <script src="../library/nested-list.js"></script>

    <!-- sweet alert -->
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <!-- moment js -->
    <script src="../library/moment.js"></script>
    <!-- iconify -->
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <!-- gemini AI -->
    <script type="importmap">
        {
        "imports": {
          "@google/generative-ai": "https://esm.run/@google/generative-ai"
        }
      }
    </script>
    <!-- local js -->
    <script src="../script/task.js" type="module"></script>
    <script>
        function openDropdown() {
            document.getElementById("submenu").classList.toggle("open");
        }
    </script>
</body>

</html>