<?php

class Block extends Connection
{
    public function saveBlockData($blockData)
    {
        $block_id =  $blockData["blockId"];
        $id_user = $blockData["userId"];
        $block_title =  $blockData["blockTitle"];
        $blocks_data =  $blockData["blocksData"];
        $username =  $blockData["username"];
        $created_at =  $blockData["createdAt"];
        $status =  $blockData["status"];
        $deadline =  $blockData["deadline"];

        try {
            if ($this->checkBlock($block_id) > 0) {
                $this->updateBlock($blockData);
            } else {
                $result = $this->executeQuery("INSERT INTO block(block_id, block_title, blocks_data, username, created_at, status, deadline, id_user) VALUES ('$block_id', '$block_title', '$blocks_data' ,'$username', '$created_at', '$status', '$deadline', '$id_user')");
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

    public function updateProject($blockData)
    {
        $block_id =  $blockData["blockId"];
        $block_title =  $blockData["blockTitle"];
        $username =  $blockData["username"];
        $status =  $blockData["status"];
        $deadline =  $blockData["deadline"];

        try {
            $result = $this->executeQuery("UPDATE block SET block_title = '$block_title', status = '$status', deadline = '$deadline' WHERE block_id = '$block_id' AND username='$username'");
            return $result->rowCount();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function deleteBlock($blockData)
    {
        $block_id =  $blockData["blockId"];
        $username =  $blockData["username"];

        try {
            $result = $this->executeQuery("DELETE FROM block WHERE block_id = '$block_id' AND username='$username'");
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
            $result = $this->executeQuery("SELECT * FROM block WHERE username = '$username' ORDER BY created_at ASC");
            return $result->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function getBlockByStatus($username, $status)
    {
        try {
            $result = $this->executeQuery("SELECT * FROM block WHERE username = '$username' AND status='$status' ORDER BY created_at ASC");
            return $result->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
