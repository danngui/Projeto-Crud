<?php
include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"];
$senha = $data["senha"];

$sql = "SELECT * FROM users WHERE email='$email' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(["erro" => "Usuário não encontrado"]);
    exit;
}

$user = $result->fetch_assoc();

// verifica senha
if (!password_verify($senha, $user["senha"])) {
    echo json_encode(["erro" => "Senha incorreta"]);
    exit;
}

// atualiza primeiro
$conn->query("UPDATE users SET last_login = NOW() WHERE email='$email'");

// busca de novo atualizado
$result = $conn->query("SELECT * FROM users WHERE email='$email' LIMIT 1");
$user = $result->fetch_assoc();

// retorna atualizado
echo json_encode([
    "usuario" => [
        "nome" => $user["nome"],
        "email" => $user["email"],
        "created_at" => $user["created_at"],
        "last_login" => $user["last_login"]
    ]
]);