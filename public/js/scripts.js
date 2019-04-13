

function checkForm(){
    var email = document.getElementById('email')
    var cemail = document.getElementById('cemail')

    var password = document.getElementById('password')
    var cpassword = document.getElementById('cpassword')

    if(email.value == "" || email.value != cemail.value){
        cemail.classList.add('is-danger');
    }
    else{
        cemail.classList.remove('is-danger')
    }

    if(password.value == "" || password.value != cpassword.value){
        cpassword.classList.add('is-danger');
    }
    else{
        cpassword.classList.remove('is-danger')
    }

    if(email.value == cemail.value && password.value == cpassword.value && email.value != "" && password.value != ""){
        document.getElementById('regform').submit();
    }
}