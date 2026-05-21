<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dadosRecebidos = json_decode(file_get_contents("php://input"), true);

if (!empty($dadosRecebidos['email']) && !empty($dadosRecebidos['senha'])) {
    $email = $dadosRecebidos['email'];
    $senha = $dadosRecebidos['senha'];

    if ($email === "admin@gmail.com" && $senha !== "123456") {
        http_response_code(401);
        echo json_encode(["erro" => "Senha incorreta para o admin!"]);
        exit;
    }

    http_response_code(200);
    echo json_encode([
        "mensagem" => "Login autorizado via PHP!",
        "usuario" => [
            "nome" => "Usuário PHP",
            "email" => $email
        ]
    ]);
} else {
    http_response_code(400);
    echo json_encode(["erro" => "Preencha e-mail e senha!"]);
}