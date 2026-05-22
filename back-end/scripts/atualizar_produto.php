<?php
include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$nome = $data["nome"];
$categoria = $data["categoria"];
$preco = $data["preco"];
$estoque = $data["estoque"];

$sql = "UPDATE products SET
nome='$nome',
categoria='$categoria',
preco='$preco',
estoque='$estoque'
WHERE id=$id";

$conn->query($sql);

// CRIA NOTIFICAÇÃO
$conn->query("
INSERT INTO notifications (titulo, descricao, tipo)
VALUES (
    'Produto atualizado',
    'O produto $nome foi atualizado.',
    'update'
)
");

echo json_encode(["msg" => "Atualizado"]);