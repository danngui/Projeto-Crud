<?php

include __DIR__ . "/database.php";

$sql = "SELECT * FROM notifications ORDER BY id DESC";

$result = $conn->query($sql);

$notifications = [];

while ($row = $result->fetch_assoc()) {
    $notifications[] = $row;
}

echo json_encode($notifications);