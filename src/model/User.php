<?php
class User extends Connection
{
    public function __construct()
    {
        Connection::__construct();
    }
    public function getData()
    {
        $query = $this->pdo->query("SELECT * FROM t2");
        $query->execute();
        return $query->fetchAll();
    }
}
