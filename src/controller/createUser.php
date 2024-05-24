<?php

require_once "../model/Connection.php";
require_once "../model/User.php";
$user = new User();
$result = $user->createUser("iqbal", "123");

if ($result) {
    header("Location: login.php");
}
