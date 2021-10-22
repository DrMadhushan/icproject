const axios = require('axios');
const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;
const { readdir } = require('original-fs');

function validatePassword(pwd) {
    if (pwd.value.length < 8){
        console.log("Invalid Password at login");
        return false;
    }
    return true;
}

function validateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat)){
        return true;
    }
    console.log("Invalid Email at login");
    return false;
}

/*
Login process with verification
*/

function userLogin() {
    var info = document.getElementById('info-box');
    console.log("clicked");
    // e.preventDefault();
    if (!(navigator.onLine)) {
        console.log("Offline")
        return;
    }

    var email = document.getElementById('email');
    var pwd = document.getElementById('passcode');
/*
    if (!validateEmail(email)){
        info.innerHTML = "The email address provided is invalid<br>Please re-enter your credentials!"
        return;
    }
    else if (!(validatePassword(pwd))){
        info.innerHTML = "Invalid password!";
        return;
    }
*/
    // authenticate using api
    var apiLoginRoute = "https://" + "www.makerspace.com/api/user/login";
    var dummy = 'https://jsonplaceholder.typicode.com/todos/1';

    let xhr = new XMLHttpRequest();
    xhr.open('GET', dummy);
    xhr.send();

    console.log("before");
    xhr.onload = () => {
        dict = JSON.parse(xhr.response);
        console.log(dict);
        info.innerHTML = "Fetched!<br>" + xhr.response;
        sessionStorage.setItem('current_user', dict.id);
        sessionStorage.setItem('token', dict.title);
        if (xhr.status == 200){
            window.location.href = 'dashboard.html';
        }
        
    }

    console.log("after");
}