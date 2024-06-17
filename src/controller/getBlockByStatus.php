<?php

require_once "../model/Connection.php";
require_once "../model/Block.php";

$block = new Block();
$result = $block->getBlockByStatus($_GET["username"], $_GET["status"]);
echo json_encode($result);
