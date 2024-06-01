<?php
require_once "../model/Connection.php";
require_once "../model/Block.php";

$block = new Block();
$result = $block->saveBlockData($_POST);
echo json_encode($result);
