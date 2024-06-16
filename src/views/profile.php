<?php
session_start();

require_once "../model/Connection.php";
require_once "../model/User.php";
$user = new User();

$id = $_SESSION["id"];
$username = $_SESSION["username"];
$email = $_SESSION["email"];
$image = $_SESSION["image"] ? $_SESSION["image"] : "no-image.png";

//? components
include '../components/inputProfile.php';

?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="../css/profile.css"> -->
    <title>Document</title>
    <link href="../output.css" rel="stylesheet">
</head>

<body class="bg-slate-200">
    <div class="flex flex-col items-center gap-3 mt-20 w-full">
        <!-- picture -->
        <div class="text-transparent transition-all duration-[0.3s] ease-[ease] flex justify-center items-center relative group">
            <label class="cursor-pointer h-[165px] w-[165px] group-hover:flex group-hover:justify-center group-hover:items-center group-hover:bg-[rgba(194,194,194,0.5)] group-hover:z-[10000] group-hover:text-neutral-50 group-hover:transition-[background-color] group-hover:duration-[0.2s] group-hover:ease-[ease-in-out] group-hover:mb-0 group-hover:rounded-[100px]" for="file">
                <span class="inline-flex h-[2em] p-[0.2em]"></span>
                <span class="inline-flex h-[2em] p-[0.2em]">Change Image</span>
            </label>
            <input class="hidden" id="file" type="file" onchange="loadFile(event)" />
            <img src="../uploads/<?= $image ?>" class="absolute object-cover w-[165px] h-[165px] shadow-[0_0_10px_0_rgba(255,255,255,0.35)] z-0 rounded-[100px]" id="output" width="200" />
        </div>
        <!-- username -->
        <?= inputUser("mt-5", "text", "username", "$username", "insert your username") ?>
        <!-- email -->
        <?= inputUser("", "email", "email", "$email", "insert your email") ?>

        <!-- password -->
        <?= inputUser("", "password", "password", "", "insert your password") ?>

        <!-- <button class="btn-secondary bg-gray-600 text-white w-1/4 mt-8" onclick="enableEditInput(event)">Enable Editing</button> -->
        <button class="btn-primary w-1/4 disabled:opacity-70 mt-8" onclick="saveData(event)">Save</button>
        <button class="btn-secondary w-1/4 bg-gray-400 text-white" onclick="window.location.href='task.php'">Back</button>
    </div>


    <!-- jquery -->
    <script src="../library/jquery.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!-- sweet alert -->
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <!-- iconify -->
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>


    <script src="../script/profile.js"></script>
</body>

</html>