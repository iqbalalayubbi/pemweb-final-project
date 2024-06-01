<?php

require_once "../model/Connection.php";
require_once "../model/User.php";

$user = new User();

echo $user->checkUsername($_POST["username"]);
