<?php
session_start();

require_once "../model/Connection.php";
require_once "../model/User.php";
$user = new User();

$result = $user->login($_POST["username"], $_POST["password"]);
if ($result) {
    header("Location:../views/task.php");
    $_SESSION["id"] = $result["id"];
    $_SESSION["username"] = $_POST["username"];
    $_SESSION["email"] = $result["email"];
    $_SESSION["image"] = $result["image"];
    $_SESSION["loginStatus"] = [
        "success" => true,
        "message" => "login successful",
    ];
} else {
    header("Location:../views/login.php");
    $_SESSION["loginStatus"] = [
        "success" => false,
        "message" => "your username and password are incorrect",
    ];
}
