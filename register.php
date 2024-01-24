<?php
include('db_connect.php');  

session_start();

header('Content-Type: application/json');

$db = mysqli_connect('localhost', 'root', '', 'recept');
if (!$db) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . mysqli_connect_error()]));
}

function register($conn, $data) {

   /* if (isset($_SESSION['email'])) {
        // Create a JSON response for successful login
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Please log out of your account first', 'data' => 'already signed in']);
    };*/

    $first_name = $data['firstName'];
    $last_name = $data['lastName'];
    $email = $data['Email'];
    $hashed_password=$data['password'];
    $username=$data['username'];

        // Check if the email already exists
        $checkEmailQuery = "SELECT COUNT(*) AS count FROM korisnici WHERE email = ?";
        $checkEmailStmt = $conn->prepare($checkEmailQuery);
        $checkEmailStmt->bind_param("s", $email);
        $checkEmailStmt->execute();
        $checkEmailResult = $checkEmailStmt->get_result();
        $emailCount = $checkEmailResult->fetch_assoc()['count'];
        $checkEmailStmt->close();
    
        if ($emailCount > 0) {
            // Email already exists, send a custom error message
            echo json_encode(['status' => 'error', 'message' => 'Email already exists. Please use a different email.', 'data' => 'duplicate email']);
            return;
        }

    // Insert data into the 'korisnici' table
    $sql = "INSERT INTO korisnici (first_name, last_name, password, email, username) VALUES (?, ?,  ?, ?, ?)";
        $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("sssss", $first_name, $last_name, $hashed_password, $email, $username);

        if ($stmt->execute()) {

            // Set the email in the session
            $_SESSION['email'] = $email;
            $_SESSION['isAdmin'] = false;

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
