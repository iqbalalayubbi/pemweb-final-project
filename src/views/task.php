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
    <!-- navbar -->
    <!-- <div id="nav-bar">
        <input id="nav-toggle" type="checkbox" />
        <div id="nav-header"><a id="nav-title" href="https://codepen.io" target="_blank">E<i class="fab fa-codepen"></i>asy Task</a><label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
            <hr />
        </div>
        <div id="nav-content">
            <div class="nav-button"><i class="fas fa-fire"></i><span>Project1</span></div>
            <div class="nav-button"><i class="fas fa-fire"></i><span>Project2</span></div>
            <hr />
            <div id="nav-content-highlight"></div>
        </div><input id="nav-footer-toggle" type="checkbox" />
        <div id="nav-footer">
            <div id="nav-footer-heading">
                <div id="nav-footer-avatar">
                    <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" />
                </div>
                <div id="nav-footer-titlebox">
                    <a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">@yourname</a>
                    <a href="#" onclick="confirmLogout(event)"><span id="nav-footer-subtitle">Logout</span></a>
                </div>
                <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
            </div>
        </div>
    </div> -->

    <nav>
        <div class="main">
            <div class="icon">Easy Task</div>
            <div class="profile">
                <img src="../assets/ilustration.svg" alt="" width="50">
                <span class="username-container" data-username="<?= $_SESSION['username'] ?>"><?= $_SESSION["username"] ?></span>
            </div>
            <h1 class="title">Projects</h1>
            <div class="projects">
                <?php foreach ($result as $block) : ?>
                    <button class="btn btn-project" role="button" data-blockId="<?= $block["block_id"] ?>">
                        <img src="../assets/tutor-1.svg" alt="" width="30">
                        <?= $block["block_title"] ?>
                    </button>
                <?php endforeach; ?>
            </div>
            <button class="btn btn-add" role="button">
                <img src="../assets/icons/add.svg" alt="" width="30">
                New Projcet
            </button>
        </div>

        <button class="btn btn-logout" role="button">
            <img src="../assets/icons/logout.svg" alt="" width="30">
            Logout
        </button>
    </nav>

    <div id="editorjs" class="editorjs-container"></div>

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

    <!-- local js -->
    <script src="../script/task.js" type="module"></script>
</body>

</html>