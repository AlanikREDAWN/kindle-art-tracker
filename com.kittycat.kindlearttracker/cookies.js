
function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + "; path=/";
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
}