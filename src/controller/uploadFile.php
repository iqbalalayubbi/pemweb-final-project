<?php
session_start();

require_once "../model/Connection.php";
require_once "../model/User.php";

$user = new User();
$username = $_SESSION["username"];

if (isset($_FILES["file"])) {
    $uploadFolder = "../uploads/";
    $file = $_FILES["file"];
    $fileInfo = pathinfo($file["name"]);
    $filename = $fileInfo["filename"] . '-' . time() . '.' . $fileInfo["extension"];
    $filePath = $uploadFolder . $filename;
    try {
        move_uploaded_file($_FILES["file"]["tmp_name"], $filePath);
        $_SESSION["image"] = $filename;
        $user->uploadImage($filename, $username);
        echo true;
    } catch (\Throwable $th) {
        echo false;
    }
}
