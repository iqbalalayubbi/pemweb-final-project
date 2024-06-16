<?php

session_start();

require_once "../model/Connection.php";
require_once "../model/User.php";

$user = new User();
$id = $_SESSION["id"];
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

if ($username) {
    $_SESSION["username"] = $username;
}

if ($email) {
    $_SESSION["email"] = $email;
}
$result = $user->updateUser($id, $username, $email, $password);
echo $result;
