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
        if (!$usernameExist) {
            $hashPassword = password_hash($password, PASSWORD_DEFAULT);
            $result = $this->executeQuery("INSERT INTO user (username, password) VALUES ('$username', '$hashPassword')");
            return $result->rowCount();
        } else {
            return false;
        }
    }

    public function getData()
    {
        $query = $this->pdo->query("SELECT * FROM t2");
        $query->execute();
        return $query->fetchAll();
    }

    public function checkUsername($username)
    {
        $result = $this->executeQuery("SELECT * FROM user WHERE username = '$username'");
        return $result->rowCount() > 0 ? true : false;
    }

    public function login($username, $password)
    {
        $result = $this->executeQuery("SELECT * FROM user WHERE username = '$username'");
        $user = $result->fetch(PDO::FETCH_ASSOC);
        if (password_verify($password, $user["password"])) {
            return true;
        } else {
            return false;
        }
    }
}
