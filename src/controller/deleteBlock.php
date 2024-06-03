<?php

require_once "../model/Connection.php";
require_once "../model/Block.php";

$block = new Block();
$result = $block->deleteBlock($_POST);
echo $result;
