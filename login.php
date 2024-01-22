<?php
session_start();
include('db_connect.php');
$errors = array();

// Check if the user is already logged in
if (isset($_SESSION['email'])) {
    // Create a JSON response for successful login
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => $_SESSION['email']]);
} else {
    // Check if the data is sent via JSON
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    // Check if JSON is decoded successfully
    if ($data === null) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data sui']);
    } else {
        login($conn, $data);
    }
}

function login($conn, $data) {
    $errors = [];
    $email = $data['email'];
    $password = $data['password'];

    if (empty($email)) {
        array_push($errors, "Email is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }

    if (count($errors) == 0) {
        $query = "SELECT * FROM korisnici WHERE LOWER(email) = LOWER(?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            if ($password === $user['password']) {
                // Password is correct
                $_SESSION['email'] = $user['email'];
                $_SESSION['success'] = "You are now logged in";

                var_dump($_SESSION);
                // Create a JSON response for successful login
                header('Content-Type: application/json');
                echo json_encode(['status' => 'success', 'message' => $_SESSION['email']]);
            } else {
                array_push($errors, "Wrong password");
            }
        } else {
            array_push($errors, "User not found");
        }
    }

    // Print a JSON response for validation errors
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors]);
}
?>