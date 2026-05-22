<?php
include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["nome"], $data["email"], $data["senha"])) {
    echo json_encode(["erro" => "Dados incompletos"]);
    exit;
}

$nome = $data["nome"];
$email = $data["email"];
$senha = password_hash($data["senha"], PASSWORD_DEFAULT);

// Verifica se já existe
$check = $conn->query("SELECT * FROM users WHERE email='$email'");

if ($check->num_rows > 0) {
    echo json_encode(["erro" => "Email já existe"]);
    exit;
}

// Insere no banco
$sql = "INSERT INTO users (nome, email, senha)
VALUES ('$nome', '$email', '$senha')";

$conn->query($sql);

// CRIA NOTIFICAÇÃO
$conn->query("
INSERT INTO notifications (titulo, descricao, tipo)
VALUES (
    'Novo usuário criado',
    'O usuário $nome foi cadastrado no sistema.',
    'user'
)
");
echo json_encode(["msg" => "Usuário criado"]);