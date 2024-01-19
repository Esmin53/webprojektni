<?php
// Poveži se s bazom podataka
// Provjeri da li je forma za registraciju poslata
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Prihvati podatke iz forme
    $first_name = isset($_POST['first_name']) ? $_POST['first_name'] : '';
    $last_name = isset($_POST['last_name']) ? $_POST['last_name'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Pripremi SQL upit za unos korisnika
    $sql = "INSERT INTO app (first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?)";

    // Pripremi SQL naredbu
    $host = "localhost";
    $db_username = "root";
    $db_password = "";
    $database = "recept";
    // Create connection
    $conn = new mysqli($host, $db_username, $db_password, $database);
   
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // Continue with your database operations without closing the connection here
}
?>
