<?php

$host = "localhost";
$user = "root";
$pass = "senhaSqL1nter";
$db = "crud_produtos";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}