const register = document.getElementById('register');
const login = document.getElementById('login');
const signLink = document.getElementById('sign');
const logLink = document.getElementById('log');

logLink.addEventListener("click", function(){
    login.style.opacity = 1;
    register.style.opacity = 0;
});

signLink.addEventListener("click", function(){
    login.style.opacity = 0;
    register.style.opacity = 1;
});