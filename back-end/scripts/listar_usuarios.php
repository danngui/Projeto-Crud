<?php

include __DIR__ . "/database.php";

$sql = "SELECT id, nome, email, created_at FROM users ORDER BY id DESC";

$result = $conn->query($sql);

$usuarios = [];

while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);