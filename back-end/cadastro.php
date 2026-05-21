<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dadosRecebidos = json_decode(file_get_contents("php://input"), true);

if (!empty($dadosRecebidos['nome']) && !empty($dadosRecebidos['email']) && !empty($dadosRecebidos['senha'])) {
    
    $nome = $dadosRecebidos['nome'];
    $email = $dadosRecebidos['email'];
    $senha = $dadosRecebidos['senha'];

   
    if ($email === "teste@gmail.com") {
        http_response_code(400);
        echo json_encode(["erro" => "Este e-mail já está cadastrado!"]);
        exit;
    }

    http_response_code(201);
    echo json_encode([
        "mensagem" => "Cadastro realizado com sucesso via PHP!",
        "usuario" => [
            "nome" => $nome,
            "email" => $email,
            "dataCriacao" => date('d/m/Y')
        ]
    ]);
} else {
    http_response_code(400);
    echo json_encode(["erro" => "Preencha todos os campos!"]);
}