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
        // echo $result->errorCode();
        if (!$usernameExist) {
            // create a new user
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
}
