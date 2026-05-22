<?php
include __DIR__ . "/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"];

$sql = "SELECT nome, email, created_at FROM users WHERE email='$email' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(["erro" => "Usuário não encontrado"]);
    exit;
}

$user = $result->fetch_assoc();

echo json_encode($user);