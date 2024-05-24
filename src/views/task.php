<?php
// require_once '../model/Connection.php';
// require_once '../model/User.php';
// $user = new User();
// var_dump($user->getData());
// var_dump($_POST);
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
    <div id="nav-bar">
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
                    <a href="index.php"><span id="nav-footer-subtitle">Logout</span></a>
                </div>
                <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
            </div>
        </div>
    </div>

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
    <!-- local js -->
    <script src="../script/task.js"></script>
</body>

</html>