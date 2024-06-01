<?php

class Block extends Connection
{
    public function saveBlockData($blockData)
    {
        $block_id =  $blockData["blockId"];
        $block_title =  $blockData["blockTitle"];
        $blocks_data =  $blockData["blocksData"];
        $username =  $blockData["username"];
        $created_at =  $blockData["createdAt"];

        try {
            if ($this->checkBlock($block_id) > 0) {
                $this->updateBlock($blockData);
            } else {
                $result = $this->executeQuery("INSERT INTO block(block_id, block_title, blocks_data, username, created_at) VALUES ('$block_id', '$block_title', '$blocks_data' ,'$username', '$created_at')");
                return $result->rowCount();
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function updateBlock($blockData)
    {
        $block_id =  $blockData["blockId"];
        $blocks_data =  $blockData["blocksData"];
        $username =  $blockData["username"];
        $created_at =  $blockData["createdAt"];

        try {
            $result = $this->executeQuery("UPDATE block SET blocks_data = '$blocks_data', created_at = '$created_at' WHERE block_id = '$block_id' AND username='$username'");
            return $result->rowCount();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function checkBlock($block_id)
    {
        try {
            $result = $this->executeQuery("SELECT * FROM block WHERE block_id = '$block_id' ORDER BY created_at ASC");
            return $result->rowCount();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function checkUsername($username)
    {
        try {
            $result = $this->executeQuery("SELECT * FROM block WHERE username = '$username' ORDER BY created_at ASC");
            return $result->rowCount();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function getBlock($blockId, $username)
    {
        try {
            $result = $this->executeQuery("SELECT * FROM block WHERE block_id = '$blockId' AND username = '$username' ORDER BY created_at ASC");
            return $result->fetch(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function getAllBlock($username)
    {
        try {
            $result = $this->executeQuery("SELECT block_id, block_title FROM block WHERE username = '$username' ORDER BY created_at ASC");
            return $result->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}