function processPassword() {
	var password = document.getElementById("password").value;
	// localStorage.setItem("password", password);
    setCookie('password', password);
	window.location.href = "home.html";
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("passwordForm").onsubmit = function (event) {
		event.preventDefault();
		processPassword();
	};
});
