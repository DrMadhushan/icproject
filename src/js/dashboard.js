function initDash() {
    let user_mail = sessionStorage.getItem("user_email");
    let token = sessionStorage.getItem("user_token");
    console.log(user_mail);
    console.log(token);
    let nav_right = document.getElementById('nav_profile');
    let pickupCollection = document.getElementById('pickup_package_collection');
    let returnCollection = document.getElementById('return_package_collection');

    let api_host = 'http://127.0.0.1:8000/api';
    let url = api_host + '/auth/user'

    // reteive user profile data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();

    xhr.onload = () => {
        let dict = JSON.parse(xhr.response);
        console.log(dict);
        nav_right.innerHTML = `
        <div class="profile p-3 pt-0 pb-0">${user_mail} </div> 
        <img src="${dict.avatar}" width="30" height="30" class="d-inline-block align-text-top">
        `
        sessionStorage.setItem('avatar', dict.avatar);
    }

    // retirve orders data
    let pkg_req = new XMLHttpRequest();
    pkg_req.open('GET', url + '/orders');
    pkg_req.setRequestHeader('Authorization', 'Bearer ' + token);
    pkg_req.send();

    pkg_req.onload = () => {
        let arr = JSON.parse(pkg_req.response);
        console.log(arr);

        // for (const item in arr) {
        //     // console.log(typeof item);
        //     console.log(arr[item]['status']);
        // }

        pickupCollection.innerHTML = `<div>
        <div class="m-2 h5"><i class="fas fa-hand-holding-heart"></i> Packages to pickup</div>`;

        returnCollection.innerHTML = `<div">
        <div class="m-2 h5"><i class="fas fas fa-exchange-alt"></i> Packages to return</div>`;
        
        for (const packId in arr){
            // let pack = JSON.parse(arr[i]);
            
            if (arr[packId]['status'] == 'ready'){
                // selecting only the un picked packages
                /*
                if (arr[packId]['status'] == 'progress'){
                    message = 'Processing';
                    disable = 'disabled';
                } else if (arr[packId]['status'] == 'pending'){
                    message = 'Not approved yet'
                    disable = 'disabled';
                } */
                // if (arr[packId]['status'] == 'ready'){
                message = 'Ready';
                // }

                pickupCollection.innerHTML += `<div class="m-2">
                    <div class="package shadow-sm">
                        <div class="h6">MSPKG#${arr[packId]['id']}</div>
                        <div>${message}</div>
                        <div>Return before ${arr[packId]['due_date_to_return']}</div>
                        <div class="justify-content-end align-items-right" style="text-align: end;">
                        <a class="btn btn-primary shadow-sm btn-sm mt-2" href="package.html" onclick="showPackage(${arr[packId]['id']})" role="button"><i class="fas fa-arrow-circle-down"></i> Pickup</a>
                        </div>
                    </div>
                </div>`;
            } else {
                //
            }
            if (arr[packId]['status'] == 'pickedup'){
                returnCollection.innerHTML += `<div class="m-2">
                    <div class="package shadow-sm">
                        <div class="h6">MSPKG#${arr[packId]['id']}</div>
                        <div>Return before ${arr[packId]['due_date_to_return']}</div>
                        <div class="justify-content-end align-items-right" style="text-align: end;">
                        <a class="btn btn-primary shadow-sm btn-sm mt-2" href="package.html" onclick="showPackage(${arr[packId]['id']})"  role="button"><i class="fas fa-people-carry"></i> Return</a>
                        </div>
                    </div>
                </div>`;
            }
            
        }
        returnCollection.innerHTML += `</div></div>`;
        pickupCollection.innerHTML += `</div></div>`;
    }
}

function logout(conf){
    let logout_block = document.getElementById('logout_block');
    if (conf == true){
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
    } else if (conf == null){
        logout_block.innerHTML = 
        `<a class="btn btn-warning shadow-sm btn-sm mt-2 m-2 w-25" onclick="logout(true)" role="button"><i class="far fa-check-circle"></i> Sure</a>
         <a class="btn btn-success shadow-sm btn-sm mt-2 m-2 w-25" onclick="logout(false)" role="button"><i class="far fa-times-circle"></i> close</a>
        `;
    } else {
        logout_block.innerHTML = `<a class="btn btn-danger shadow-sm btn-sm mt-2 w-50" onclick="logout(null)" role="button"><i class="fas fa-sign-out-alt"></i> Logout</a>`;
    }

    
}


function showPackage(packageId){
    sessionStorage.setItem('req_package_id', packageId);
    window.location.href = 'package.html';
}