<?php

require_once "../model/Connection.php";
require_once "../model/Block.php";

$block = new Block();
$result = $block->updateTitle($_POST);
echo $result;
