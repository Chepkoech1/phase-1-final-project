const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit")
const loginErrorMessage = document.getElementById("login-error-message")
 

const loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if(username === "user" && password ==="web_dev"){
        alert("login successful.");
        location.reload();
    }else{
        loginErrorMessage.style.opacity = 1;
    }
})