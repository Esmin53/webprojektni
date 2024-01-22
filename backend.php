<?php
session_start();
include('db_connect.php');

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

$action = $_GET['action'];

if ($action === 'getkorisnici') {
    // Handle the action to get user data
    $result = $conn->query("SELECT * FROM korisnici");
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Respond with the fetched data
    echo json_encode($data);
} elseif ($action === 'addArticle') {
    // Perform logic for adding an article
} elseif ($action === 'editArticle') {
    // Perform logic for editing an article
} elseif ($action === 'getRecipes') {
    // Handle the action to get recipe data
    $result = $conn->query("SELECT * FROM recepti");
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Respond with the fetched data
    echo json_encode($data);
} else if($action === 'logOut') {
    if (isset($_SESSION['email'])) {
        // Unset all session variables
        $_SESSION = array();
    
        // Destroy the session
        session_destroy();
    
        // Return a JSON response indicating successful logout
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Logout successful']);
    } else {
        // Return a JSON response indicating that the user is not logged in
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    }
} elseif ($action === 'deleteArticle') {
    // Perform logic for deleting an article
} elseif ($action === 'getSession') {
    // Handle the action to get session data
    $response = array();  // Create an associative array for the response

    if (isset($_SESSION['email'])) {
        $userEmail = $_SESSION['email'];
        $response['status'] = 'success';
        $response['message'] = "User email: $userEmail";
        $response['data'] = $userEmail;
    } else {
        $response['status'] = 'error';
        $response['message'] = "No email set in the session";
    }

    // Set the response header to indicate JSON content
    header('Content-Type: application/json');

    // Echo the JSON-encoded response
    echo json_encode($response);
}  else {
    // Handle unknown action or provide a default action
    echo json_encode(['error' => 'Unknown action']);
}

// Close the database connection
$conn->close();
?>
