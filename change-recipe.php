<?php
session_start();
$host = "localhost";
$db_username = "root";
$db_password = "";
$database = "recept";

// Create a connection to the database
$conn = new mysqli($host, $db_username, $db_password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the data sent from the client
$data = json_decode(file_get_contents('php://input'), true);

// Extract data
$recipeId = isset($data['recipeId']) ? $data['recipeId'] : null;
$newTitle = isset($data['title']) ? $data['title'] : null;
$newCookingTime = isset($data['cookingTime']) ? $data['cookingTime'] : null;
$newDifficulty = isset($data['difficulty']) ? $data['difficulty'] : null;

// Fetch existing recipe details




// Send the response back to the client
header('Content-Type: application/json');
echo json_encode($response);
?>
