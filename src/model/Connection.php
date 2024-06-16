<?php

class Connection
{
    private $dsn = 'mysql:host=localhost;dbname=easy-task';
    private $username = 'root';
    private $password = '';
    public $pdo;
    public $name = "mysql";

    public function __construct()
    {

        try {
            $this->pdo = new PDO($this->dsn, $this->username, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            // echo "connection established";
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            exit();
        }
    }

    public function executeQuery($sql)
    {
        $query = $this->pdo->query($sql);
        return $query;
    }
}
