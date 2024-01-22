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
$title = isset($data['title']) ? $data['title'] : null;
$cookingTime = isset($data['cookingTime']) ? $data['cookingTime'] : null;
$ingredients = isset($data['ingredients']) ? $data['ingredients'] : null;
$instructions = isset($data['instructions']) ? $data['instructions'] : null;
$dificulty = isset($data['dificulty']) ? $data['dificulty'] : null;
$userEmail = $_SESSION['email'];

// Insert data into the "recepti" table
$sqlRecepti = "INSERT INTO recepti (title, cookingTime, difficulty, instructions, user_email) VALUES ('$title', '$cookingTime', '$dificulty','$instructions', '$userEmail')";

$response = array();

if ($conn->query($sqlRecepti) === TRUE) {
    // Retrieve the generated id
    $recepti_id = $conn->insert_id;

    // Insert data into the "ingredients" table
    foreach ($ingredients as $ingredient) {
        $ingredient_name = $ingredient['ingredient_name'];
        $amount = $ingredient['amount'];

        $sqlIngredients = "INSERT INTO ingredients (recepti_id, ingredient_name, amount) VALUES ('$recepti_id', '$ingredient_name', '$amount')";

        if ($conn->query($sqlIngredients) !== TRUE) {
            $response['status'] = 'error';
            $response['message'] = 'Error inserting data into ingredients: ' . $conn->error;
            break;
        }
    }

    if (!isset($response['status'])) {
        $response['status'] = 'success';
        $response['message'] = 'Data received and inserted successfully';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Error inserting data into recepti: ' . $conn->error;
}

// Close the database connection
$conn->close();

// Send the response back to the client
header('Content-Type: application/json');
echo json_encode($response);

?>
