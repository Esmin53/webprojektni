<?php
session_start();


// Check if the user is logged in
$_SESSION['email'] = $userEmail;{ // assuming $userEmail is the user's email after successful login
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Location:dashboard.html");

}
session_start();

// Check if the user is logged in, otherwise redirect to login page
if (!isset($_SESSION['email'])) {
    header("Location: register.php");
    exit();
}

// Fetch user-specific recipes from the database and display them

$conn = new mysqli("your_db_host", "your_db_user", "your_db_password", "your_db_name");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_SESSION['email'];
$query = "SELECT * FROM recipes WHERE user_email = '$email'";
$result = $conn->query($query);
?>

