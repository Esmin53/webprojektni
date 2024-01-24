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
$oldPassword = isset($data['oldPassword']) ? $data['oldPassword'] : null;
$newPassword = isset($data['newPassword']) ? $data['newPassword'] : null;
$userEmail = $_SESSION['email'];

// Prepare and execute the update statement
$stmt = $conn->prepare("UPDATE korisnici SET password = ? WHERE email = ?");
$stmt->bind_param("ss", $newPassword, $userEmail);
$stmt->execute();

// Check if the update was successful
if ($stmt->affected_rows > 0) {
    // Clear session variables to log out the user
    $_SESSION = array();
    session_destroy();

    $response = array(
        'status' => 'success',
        'message' => 'Password updated successfully',
    );
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Failed to update password',
    );
}

$stmt->close();
$conn->close();

// Send the response back to the client
header('Content-Type: application/json');
echo json_encode($response);
?>