function login() {

    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    const requestBody = JSON.stringify({
        email: email,
        password: password,
    });

    fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody,
    })
    .then(response => response.json())
    .then(data => {
        console.log('JSON Response:', data);

        if (data && data.status && data.status.toLowerCase() === 'success') {
            console.log('Login successful');
            console.log('Redirecting to dashboard.php');
        window.location.href = 'dashboard.php';
        } else {
            console.error('Login failed:', data && data.message);
        }
    })
    .catch(error => {
        //window.location.href = 'error.php';
    });
}


function register() {
    const firstNameField = document.getElementById("Firstname").value;
    const lastNameField = document.getElementById("Lastname").value;
   const passwordField = document.getElementById("registerPassword").value;
    const EmailField = document.getElementById("Email").value;

    const requestBody = JSON.stringify({
        firstName: firstNameField,
        lastName: lastNameField,
        password: passwordField,
        Email: EmailField
    });

    fetch("register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();

    })
    .then(data => {
        console.log("Response:", data);
        if (data.toLowerCase().includes('success')) {
            console.log('Registration successful');
            window.location.href = 'dashboard.php';
        } else {
            console.error('Registration failed:', data);
        }
        
    })

    .catch(error => {
        console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var loginBtn = document.getElementById("loginBtn");
    var registerButton = document.getElementById("registerBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

    if (registerButton) {
        registerButton.addEventListener("click", register);
    }

    var blogLink = document.getElementById("blogLink");
    var blogContent = document.getElementById("blogContent");

    if (blogLink) {
        blogLink.addEventListener("click", function (event) {
            event.preventDefault();
            blogContent.style.display = blogContent.style.display === "none" ? "block" : "none";
        });
    }
});
