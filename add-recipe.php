<?php

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
$title = isset($data['title']) ? $data['title'] : null;
$cookingTime = isset($data['cookingTime']) ? $data['cookingTime'] : null;
$ingredients = isset($data['ingredients']) ? $data['ingredients'] : null;
$instructions = isset($data['instructions']) ? $data['instructions'] : null;

// Insert data into the "recepti" table
$sql = "INSERT INTO recepti (title, cookingTime, ingredients, instructions) VALUES ('$title', '$cookingTime', '$ingredients', '$instructions')";

$response = array();

if ($conn->query($sql) === TRUE) {
    $response['status'] = 'success';
    $response['message'] = 'Data received and inserted successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Error inserting data: ' . $conn->error;
}

// Close the database connection
$conn->close();

// Send the response back to the client
header('Content-Type: application/json');
echo json_encode($response);

?>