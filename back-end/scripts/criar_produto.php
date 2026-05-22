<?php
include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data["nome"] ?? "";
$categoria = $data["categoria"] ?? "";
$preco = $data["preco"] ?? 0;
$estoque = $data["estoque"] ?? 0;
$descricao = $data["descricao"] ?? "";
$imagem = $data["imagem"] ?? "";

// INSERT SEGURO
$stmt = $conn->prepare("
  INSERT INTO products (nome, categoria, preco, estoque, descricao, imagem)
  VALUES (?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
  "ssddss",
  $nome,
  $categoria,
  $preco,
  $estoque,
  $descricao,
  $imagem
);

if ($stmt->execute()) {

  // NOTIFICAÇÃO
  $stmt2 = $conn->prepare("
    INSERT INTO notifications (titulo, descricao, tipo)
    VALUES (?, ?, ?)
  ");

  $titulo = "Novo produto criado";
  $desc = "O produto $nome foi adicionado ao sistema";
  $tipo = "product";

  $stmt2->bind_param("sss", $titulo, $desc, $tipo);
  $stmt2->execute();

  echo json_encode(["msg" => "Produto criado"]);
} else {
  echo json_encode(["erro" => "Erro ao criar produto"]);
}