<?php

include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$titulo = $data["titulo"];
$descricao = $data["descricao"];
$tipo = $data["tipo"];

$sql = "INSERT INTO notifications (titulo, descricao, tipo)
VALUES ('$titulo', '$descricao', '$tipo')";

$conn->query($sql);

echo json_encode(["msg" => "Notificação criada"]);