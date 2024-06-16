<?php
class User extends Connection
{
    public function __construct()
    {
        Connection::__construct();
    }

    public function createUser($username, $password)
    {
        $usernameExist = $this->checkUsername($username);
        $userId = uniqid("user-", true);
        try {
            if (!$usernameExist) {
                $hashPassword = password_hash($password, PASSWORD_DEFAULT);
                $result = $this->executeQuery("INSERT INTO user (id, username, password) VALUES ('$userId', '$username', '$hashPassword')");
                return $result->rowCount();
            } else return false;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function checkUsername($username, $id = null)
    {
        $result = $this->executeQuery("SELECT * FROM user WHERE username = '$username' AND id != '$id'");
        return $result->rowCount() > 0 ? true : false;
    }

    public function login($username, $password)
    {
        $result = $this->executeQuery("SELECT * FROM user WHERE username = '$username'");
        $user = $result->fetch(PDO::FETCH_ASSOC);
        if (password_verify($password, $user["password"])) return $user;
        else return false;
    }

    public function uploadImage($filename, $username)
    {
        $result = $this->executeQuery("UPDATE user SET image = '$filename' WHERE username = '$username'");
        return $result->rowCount();
    }

    public function getImage($username)
    {
        $result = $this->executeQuery("SELECT image FROM user WHERE username = '$username'");
        return $result->fetch(PDO::FETCH_ASSOC)["image"];
    }

    public function updateUser($id, $username, $email, $password)
    {
        $usernameExist = $this->checkUsername($username, $id);
        try {
            if ($usernameExist)  trigger_error("username already exists");
            else {
                if ($username) $this->updateUsername($id, $username);
                if ($email) $this->updateEmail($id, $email);
                if ($password) $this->updatePassword($id, $password);
            }
        } catch (\Throwable $th) {
            echo $th->getMessage();
        }
    }

    public function updatePassword($id, $password)
    {
        try {
            $hashPassword = password_hash($password, PASSWORD_DEFAULT);
            $result = $this->executeQuery("UPDATE user SET password = '$hashPassword' WHERE id = '$id'");
            return $result->rowCount();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function updateUsername($id, $username)
    {
        try {
            $result = $this->executeQuery("UPDATE user SET username = '$username' WHERE id = '$id'");
            return $result->rowCount();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function updateEmail($id, $email)
    {
        try {
            $result = $this->executeQuery("UPDATE user SET email = '$email' WHERE id = '$id'");
            return $result->rowCount();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
