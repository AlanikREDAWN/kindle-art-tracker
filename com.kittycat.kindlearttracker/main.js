function checkPassword() {
	// var password = localStorage.getItem("password");
    var password = getCookie("password");

	if (password) {
		window.location.href = "home.html";
	} else {
		window.location.href = "enterPassword.html";
	}
}
// window.onload = function() {
//     var count = getCookie("count");
//     if (!count) {
//         count = 0;
//     }

//     count = parseInt(count, 10) + 1;
//     setCookie("count", count);

//     document.body.innerHTML = "Launch count: " + count;
// }

document.addEventListener("DOMContentLoaded", function () {
	checkPassword();
});
