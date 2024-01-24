async function login() {
    try {
        var email = document.getElementById("email")
        var password = document.getElementById("password")

        if(checkInputLength(email, 2)) {
            showToast('Authentification error', 'Please provide valid email adress!')
            return
        }

        if(checkInputLength(password, 2)) {
            showToast('Authentification error', 'Please provide valid email adress!')
            return
        }
    
        const requestBody = JSON.stringify({
            email: email.value,
            password: password.value,
        });
    
        const response = await fetch("login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        })

        if(!response.ok) {
            showToast('Something went wrong', 'There was an problem signing you in, please try again later')
        }

        const data = await response.json()
        
        if(data && data.status === 'success') window.location.href = 'homepage.html'

        console.log(data)
    } catch (error) {
        showToast('Something went wrong', 'There was an problem signing you in, please try again later')
        console.log(error)
    }
}
    





async function register() {
    try {
        const firstNameField = document.getElementById("Firstname")
        const lastNameField = document.getElementById("Lastname")
       const passwordField = document.getElementById("registerPassword")
       const confirmPasswordField = document.getElementById("confirmPassword")
        const EmailField = document.getElementById("Email")
        const userName = document.getElementById('username')
    
        if(checkInputLength(firstNameField, 1) || checkInputLength(lastNameField, 1) || checkInputLength(userName, 2) ||
         checkInputLength(EmailField, 1) || checkInputLength(passwordField, 2) || checkInputLength(confirmPasswordField, 1)) {
            showToast('Registration error', 'Please provide all required information')
            return
        }
    
        if(!checkInputValues(passwordField, confirmPasswordField)) {
            showToast('Registration error', 'Password and confirm password fields must match!')
            confirmPasswordField.classList.add('input_error')
            passwordField.classList.add('input_error')
            return
        } else {
            confirmPasswordField.classList.remove('input_error')
            passwordField.classList.remove('input_error')
        }
    
        const requestBody = JSON.stringify({
            firstName: firstNameField.value,
            lastName: lastNameField.value,
            password: passwordField.value,
            Email: EmailField.value,
            username: userName.value
        });

        const response = await fetch("register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()

        if(data.data == 'duplicate email') {
            showToast('Invalid email', 'User with that email already exists, please try again with a differnet email!')
            EmailField.classList.add('input_error')
        } else {
            EmailField.classList.remove('input_error')
        }

        if(data.status == 'success') {
            window.location.href = 'homepage.html'
        }
        
    } catch (error) {
        showToast('Something went wrong', 'There was an error creating your account please try again later')
        console.log(error)   
    }
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
