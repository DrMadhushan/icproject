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

    if (!validateEmail(email)){
        info.innerHTML = "The email address provided is invalid<br>Please re-enter your credentials!"
        return;
    }
    else if (!(validatePassword(pwd))){
        info.innerHTML = "Invalid password!<br>Password must contain atleast 8 characters";
        return;
    }

    // authenticate using api
    let api_host = 'http://127.0.0.1:8000/api';

    let xhr = new XMLHttpRequest();
    let url = api_host + '/auth/login';
    let data = `email=${email.value}&password=${pwd.value}`;
    // console.log(data);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(data);

    // console.log("before");
    xhr.onload = () => {
        dict = JSON.parse(xhr.response);
        console.log(typeof dict);
        // info.innerHTML = "Fetched!<br>" + xhr.response;
        if (xhr.status == 200){
            console.log("Status = 200 OK");
            sessionStorage.setItem('user_token', dict.token);
            sessionStorage.setItem('user_email', email.value);
            window.location.href = 'dashboard.html';
        } else {
            info.innerHTML = dict['message'];
        }
        
    }

    // console.log("after");
}