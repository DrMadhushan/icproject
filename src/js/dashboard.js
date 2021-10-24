function initDash() {
    let user_mail = sessionStorage.getItem("user_email");
    let token = sessionStorage.getItem("user_token");
    console.log(user_mail);
    console.log(token);
    let nav_right = document.getElementById('nav_profile');

    let api_host = 'http://127.0.0.1:8000/api';
    let url = api_host + '/auth/user'

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();

    xhr.onload = () => {
        dict = JSON.parse(xhr.response);
        console.log(dict);
        nav_right.innerHTML = `
        <div class="profile p-3 pt-0 pb-0">${user_mail} </div> 
        <img src="${dict.avatar}" width="30" height="30" class="d-inline-block align-text-top">
        `
    }

    let pkg_req = new XMLHttpRequest();
    pkg_req.open('GET', url + '/orders');
    pkg_req.setRequestHeader('Authorization', 'Bearer ' + token);
    pkg_req.send();

    pkg_req.onload = () => {
        dict = JSON.parse(pkg_req.response);
        console.log(dict);
    }
}

function logout(){
    let api_host = 'http://127.0.0.1:8000/api';
    let url = api_host + '/auth/logout';
    let xhr = new XMLHttpRequest();
    let token = sessionStorage.getItem("user_token");
    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
    xhr.onload = () => {            
        sessionStorage.removeItem('user_token');
        sessionStorage.removeItem('user_email');
        sessionStorage.clear();
        console.log("logged out!");
        window.location.href = 'index.html';
    }
}