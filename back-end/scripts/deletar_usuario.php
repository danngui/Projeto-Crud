<?php
include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

$conn->query("DELETE FROM users WHERE id=$id");

echo json_encode(["msg" => "Deletado"]);