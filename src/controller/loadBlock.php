<?php

require_once "../model/Connection.php";
require_once "../model/Block.php";
$block = new Block();
$result = json_encode($block->getBlock($_GET["blockId"], $_GET["username"]));
echo $result;
