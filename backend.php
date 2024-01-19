<?php
include('db_connect.php');
$servername = "localhost";
$username = "root";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = $_GET['action'];

if ($action === 'getkorisnici') {
    $result = $conn->query("SELECT * FROM korisnici");
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} elseif ($action === 'addArticle') {
    // Perform logic for adding an article
} elseif ($action === 'editArticle') {
    // Perform logic for editing an article
} elseif ($action === 'deleteArticle') {
    // Perform logic for deleting an article
} else {
    // Handle unknown action or provide a default action
    echo json_encode(['error' => 'Unknown action']);
}
$conn->close();
?>