<?php
include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$nome = $data["nome"];
$email = $data["email"];

$sql = "UPDATE users 
        SET nome='$nome', email='$email'
        WHERE id=$id";

$conn->query($sql);

echo json_encode(["msg" => "Atualizado"]);