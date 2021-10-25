function verify(){
    let user_otp = document.getElementById('passcode');
    console.log(user_otp.value);
    
    let otp_req = 'http://127.0.0.1:8000/api/auth/user/orders/' + sessionStorage.getItem('req_package_id') + '/otp/' + user_otp.value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', otp_req);
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('user_token'));
    xhr.send();
    xhr.onload = () => {
        console.log(xhr.response);
        if (xhr.response == 'true'){
            console.log("success");
            window.location.href = 'closing.html';
        } else {
            console.log("OTP not matching");
            window.location.href = 'otpverify.html';
        }
        // window.location.href = 'package.html';
    }
    
    //window.location.href = 'otpverify.html';
}