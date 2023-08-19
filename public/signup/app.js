const PRELOADING = "<div class='loader'><i class='fa fa-spin fa-spinner text-primary' style='font-size: 50px'></i></div>";

const signupCont = document.querySelector('.signup');
const loaderCont = document.querySelector('.loader-cont');
const uname = document.getElementById('name');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password_confirmation = document.getElementById('password_confirmation');
const invalidFeedback = document.querySelector('.invalid-feedback');

invalidFeedback.innerTHML = '';

loaderCont.innerHTML = PRELOADING;
setTimeout(() => {
    loaderCont.classList.add('d-none');
    signupCont.classList.remove('d-none');
}, 1500);

function generateUsername(input) {
    input.addEventListener('focusout', function () {
        if (input.value) {
            // const name = input.value.replace(/\s/g, "");
            let str = input.value.split(' ');

            if (str.length < 2) {
                username.value = input.value.toLowerCase() + '@chatapp.com';
            } else {
                const fname = str[0];
                const lname = str[str.length - 1];
                uname.classList.remove('is-invalid');
                invalidFeedback.innerHTML = '';
                const fnameFirstChar = fname.slice(0, 1);
                const name = fnameFirstChar + '.' + lname;
                username.value = name.toLowerCase() + '@chatapp.com';
            }
        };
    })
}

generateUsername(uname);

const alertDanger = document.querySelector('.alert-danger');
const alertSuccess = document.querySelector('.alert-success');

if (alertDanger) {
    password.classList.add('is-invalid');
    password_confirmation.classList.add('is-invalid');
}
