function initDash() {
    let user_mail = sessionStorage.getItem("current_user");
    let token = sessionStorage.getItem("token");
    console.log(user_mail);
    console.log(token);
    let nav_right = document.getElementById('nav_profile');
    nav_right.innerHTML = `
    <div class="profile">${user_mail} </div> 
    <img src="assets/img/favicon.png" width="30" height="30" class="d-inline-block align-text-top">
    `
}