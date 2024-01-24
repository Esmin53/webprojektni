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
} else if($action === 'getUser') {
    $userEmail = $_GET['email'];

    $stmt = $conn->prepare("SELECT id, first_name, last_name, email FROM korisnici WHERE email = ?");
    $stmt->bind_param("s", $userEmail);

    $stmt->execute();

    $result = $stmt->get_result();

    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    };

    echo json_encode($data);

} elseif ($action === 'addArticle') {
    // Perform logic for adding an article
} elseif ($action === 'getUsersRecipes') {
    $userEmail = $_SESSION['email'];

    // Use single quotes around the email value in the WHERE clause
    $result = $conn->query("SELECT title, cookingTime, difficulty, id FROM recepti WHERE user_email = '$userEmail'");

    $data = array(); // Initialize the data array

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Respond with the fetched data
    echo json_encode($data);

} elseif ($action === 'editArticle') {
    // Perform logic for editing an article
} elseif ($action === 'getRecipe') {
    $recipeId = $_GET['id']; // Replace with the desired recipe_id

// Fetch recipe details
$sqlRecipe = "SELECT * FROM recepti WHERE id = $recipeId";
$resultRecipe = $conn->query($sqlRecipe);

if ($resultRecipe && $resultRecipe->num_rows > 0) {
    $recipeData = $resultRecipe->fetch_assoc();

    // Fetch ingredients for the recipe
    $sqlIngredients = "SELECT ingredient_name, amount FROM ingredients WHERE recepti_id = $recipeId";
    $resultIngredients = $conn->query($sqlIngredients);

    if ($resultIngredients) {
        $ingredients = array();
        while ($row = $resultIngredients->fetch_assoc()) {
            $ingredients[] = array(
                'ingredient_name' => $row['ingredient_name'],
                'amount' => $row['amount']
            );
        }

        // Combine recipe details and ingredients into a single object
        $recipeObject = array(
            'recipeData' => $recipeData,
            'ingredients' => $ingredients
        );

        // Send the combined object back to the user
        echo json_encode($recipeObject);
    } else {
        echo json_encode(['error' => $conn->error]);
    }
} else {
    echo json_encode(['error' => 'Recipe not found']);
}

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
} elseif ($action === 'deleteRecipe') {
    if (isset($_SESSION['email'])) {
        $recipeId = $_GET['id'];

        $sqlRecipe = "DELETE FROM recepti WHERE id = $recipeId";
        $resultRecipe = $conn->query($sqlRecipe);


        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Succesfully deleted']);
    } else {
        // Return a JSON response indicating that the user is not logged in
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    }

    
} elseif ($action === 'getSession') {
    $response = array();

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
