<?php

require_once "../model/Connection.php";
require_once "../model/Block.php";
$block = new Block();

echo $block->checkBlock($_GET["blockId"]);
