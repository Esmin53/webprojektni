const convertCookingTime = (cookingTime) => {

     if (cookingTime == 60) {
        return '1 hour'
    } else if (cookingTime == 90) {
        return '1 hour and 30 minutes'
    } else if (cookingTime == 120) {
        return '2 hours'
    } else if (cookingTime == 150) {
        return '2 hours and 30 minutes'
    } else if (cookingTime == 180) {
        return '3 hours or more'
    } else {
        return `${cookingTime} minutes or less`
    }
}




const handleLogout = async () => {
    try {
        const response = await fetch('backend.php?action=logOut')

        if(!response.ok) {
            return
        }

        const data = await response.json()

        window.location.href = 'homepage.html'
    } catch (error) {
        showToast('Something went wrong!', 'There was an error signing you out. Please try again later')
    }
}

const formatNavbar = async () => {
    try {

        const navbarLinks = document.getElementById('navbar_links')

        const response = await fetch('backend.php?action=getSession')

        const session = await response.json()

        if(!session.data) {
            if(window.location.href.includes('dashboard') || window.location.href.includes('add-recipe')) {
                window.location.href = 'homepage.html'
            }
        } if(session.data && window.location.href.includes('signin') || session.data && window.location.href.includes('signin')) {
            window.location.href = 'homepage.html'
        }


        if(session.data) {
            const logout = document.createElement('p');
            logout.onclick = () => handleLogout()
            logout.textContent = 'Logout'
            logout.classList.add('navbar_link')
            navbarLinks.appendChild(logout)
        } else {
            const login = document.createElement('a');
            login.href = 'signin.html'
            login.textContent = 'Login'
            login.classList.add('navbar_link')
            navbarLinks.appendChild(login)
        }

    } catch (error) {
        console.log(error)
    }
}

let toast = document.getElementById('toast')

const showToast = (htext, btext) => {
    toast.classList.remove('hide')
    toast.classList.add('show')

    const header = document.getElementById('toast_header')

    const headerText = document.getElementById('toast_header_text')
    headerText.textContent = htext
    
    const bodyText = document.getElementById('toast_body_text')
    bodyText.textContent = btext

}

const hideToast = () => {
    toast.classList.remove('show')
    toast.classList.add('hide')
}

const checkInputLength = (element, length) => {
    if(element.value.length < length) {
        element.classList.add('input_error');
        return true;
    } else {
        element.classList.remove('input_error');
        return false;
    }
}

const checkInputValues = (element1, element2) => {
    if(element1.value == element2.value) {
        element1.classList.add('input_error');
        return true;
    } else {
        element1.classList.remove('input_error');
        return false;
    }
}

formatNavbar();
