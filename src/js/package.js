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
            <div class="text-success"><h4>Package ID MSPKG${package.id}</h4></div>
            <div>Order placed on ${package.ordered_date}</div>
            <div>Please return on or before ${package.due_date_to_return}</div>
        `;
        if (package.status == 'ready'){
            package_block.innerHTML += `<div>Now it is available to pickup!</div>`;
        } else if (package.status == 'pickedup'){
            package_block.innerHTML += `<div>Now you can return the package to the locker</div>`;
        }
        console.log("components");
        let itemList = package.component_items
        console.log(typeof itemList);
        package_block.innerHTML += `<div class="h5 pt-2">Package Content</div>`;
        for (const itemId in itemList){
            // console.log(itemList[itemId]);
            console.log(itemList[itemId]['title']);
            console.log(itemList[itemId]['brand']);
            console.log(itemList[itemId]['productCode']);
            package_block.innerHTML += `
            <div class="p-2">
                <div class="text-success">Product Code: ${itemList[itemId]['productCode']}</div>
                <div class="text-success">${itemList[itemId]['title']}</div>
                <div class="text-success">${itemList[itemId]['brand']}</div>
            </div>
            `;
        }
        // for (item in )
        // package_block.innerHTML += `
        // <div></div>
        // `;

    }
}

function sendOTP(){
    let otp_req = 'http://127.0.0.1:8000/api/auth/user/orders/' + sessionStorage.getItem('req_package_id') + '/otp';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', otp_req);
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('user_token'));
    xhr.send();
    xhr.onload = () => {
        console.log(xhr.response);
        sessionStorage.setItem('otp', xhr.response);
        window.location.href = 'otpverify.html';
    }

    //window.location.href = 'otpverify.html';
}

