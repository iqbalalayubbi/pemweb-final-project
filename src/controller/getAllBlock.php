<?php

require_once "../model/Connection.php";
require_once "../model/Block.php";

$block = new Block();
$result = $block->getAllBlock($_GET["username"]);
echo json_encode($result);
