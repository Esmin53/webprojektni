<?php
include('db_connect.php');  


header('Content-Type: application/json');

$db = mysqli_connect('localhost', 'root', '', 'recept');
if (!$db) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . mysqli_connect_error()]));
}

function register($conn, $data) {

    $first_name = $data['firstName'];
    $last_name = $data['lastName'];
    $email = $data['Email'];
    $hashed_password=$data['password'];

    echo "Data that I have received is $first_name, $last_name, $email, $hashed_password";

    // Insert data into the 'korisnici' table
    $sql = "INSERT INTO korisnici (first_name, last_name, password, email) VALUES (?, ?,  ?, ?)";
        $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("ssss", $first_name, $last_name, $hashed_password, $email);

        if ($stmt->execute()) {
            // Registration successful
            echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
        } else {
            // Registration failed
            echo json_encode(['status' => 'error', 'message' => 'Registration failed: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        // Error preparing statement
        echo json_encode(['status' => 'error', 'message' => 'Error preparing statement: ' . $conn->error]);
    }
}

// Check if data is sent via JSON
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

// Check if JSON decoding was successful
if ($data === null) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
} else {
    register($db, $data);
}


$db->close();
?>
