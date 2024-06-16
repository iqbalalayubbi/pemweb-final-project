<?php
session_start();

require_once "../model/Connection.php";
require_once "../model/Block.php";

$block = new Block();
$_POST["userId"] = $_SESSION["id"];
$result = $block->saveBlockData($_POST);
echo json_encode($result);
