document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("loginButton").addEventListener("click", login);
});

function login() {

    let result = document.getElementById("out");
    let username = document.getElementById("userName");
    let password = document.getElementById("password");

    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:8000/api/login/";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result.innerHTML = this.responseText;
        }
    }

    var data = JSON.stringify({"email": username.value, "password": password.value});
    xhr.send(data);
}