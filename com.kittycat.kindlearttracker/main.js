function checkPassword() {
    let password = localStorage.getItem('password');

    if (password) {
        window.location.href = "home.html"
    } else {
        window.location.href = "enterPassword.html"
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkPassword();
})