<?php

include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

// pega nome
$get = $conn->query("SELECT nome FROM products WHERE id=$id");

$produto = $get->fetch_assoc();

$nome = $produto["nome"];

// deleta
$conn->query("DELETE FROM products WHERE id=$id");

// notificação
$conn->query("
INSERT INTO notifications (titulo, descricao, tipo)
VALUES (
    'Produto deletado',
    'O produto $nome foi removido.',
    'delete'
)
");

echo json_encode(["msg" => "Produto deletado"]);