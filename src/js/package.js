function initPackageView(){
    let nav_right = document.getElementById('nav_profile');
    let package_block = document.getElementById('package_data');

    nav_right.innerHTML = `
        <div class="profile p-3 pt-0 pb-0"> ${sessionStorage.getItem('user_email')}</div> 
        <img src="${sessionStorage.getItem('avatar')}" width="30" height="30" class="d-inline-block align-text-top">
    `

    let api_host = 'http://127.0.0.1:8000/api';
    let url = api_host + `/auth/user/orders/` + sessionStorage.getItem('req_package_id');
    // console.log(url);
    let xhr = new XMLHttpRequest();
    let token = sessionStorage.getItem("user_token");
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
    xhr.onload = () => {  
        console.log("In package.html");  
        let package = JSON.parse(xhr.response);
        console.log(package);  
        package_block.innerHTML = 
        `
            <div>Package ID MSPKG${package.id}</div>
            <div>Order placed on ${package.ordered_date}</div>
            <div>Please return on or before ${package.due_date_to_return}</div>
        `;
        if (package.status == 'ready'){
            package_block.innerHTML += `<div>Now it is available to pickup!</div>`;
        } else if (package.status == 'pickedup'){
            package_block.innerHTML += `<div>Now you can return the package to the locker</div>`;
        }
        
    }
}

function sendOTP(){
    
    href="otpverify.html"
}