<?php

require_once "../model/Connection.php";
require_once "../model/User.php";
$user = new User();

$result = $user->createUser($_POST["username"], $_POST["password"]);

if ($result) {
    header("Location: ../views/login.php");
} else {
    header("Location: ../views/register.php");
}
