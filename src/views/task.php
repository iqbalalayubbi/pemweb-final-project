<?php
session_start();

if (!isset($_SESSION["username"])) {
    header("Location:../views/login.php");
}
// get all blocks from database
require_once "../model/Connection.php";
require_once "../model/Block.php";
$block = new Block();
$result = $block->getAllBlock($_SESSION["username"]);
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task</title>
    <!-- <link href="../output.css" rel="stylesheet"> -->
    <link href="../css/task.css" rel="stylesheet">
</head>

<body>
    <nav>
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
        </main>

        <button class="btn btn-logout" role="button">
            <img src="../assets/icons/logout.svg" alt="" width="15">
            Logout
        </button>

    </nav>

    <div id="editorjs" class="editorjs-container"></div>
    <div class="default-view" style="display: flex;">
        <img src="../assets/default-view.png" alt="" width="300">
        <h1>Easy Task</h1>
        <h3>Make and Manage Your Project From Here</h3>
        <p>help anyone for create the best project that can be</p>
    </div>

    <!-- <div class="container-popup">
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
    </div> -->

    <form method="post" id="form-data" class="hidden">
        <input type="hidden" name="blocks" value="">
        <!-- <button type="button" name="button" onclick="sendData()">Save Data</button> -->
    </form>

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

    <!-- sweet alert -->
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <!-- moment js -->
    <script src="../library/moment.js"></script>
    <!-- iconify -->
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>

    <!-- local js -->
    <script src="../script/task.js" type="module"></script>
</body>

</html>