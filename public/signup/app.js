const PRELOADING = "<div class='loader'><i class='fa fa-spin fa-spinner text-primary' style='font-size: 50px'></i></div>";

const signupCont = document.querySelector('.signup');
const loaderCont = document.querySelector('.loader-cont');
const uname = document.getElementById('name');
const username = document.getElementById('username');
const password = document.getElementById('password');
const invalidFeedback = document.querySelector('.invalid-feedback');

invalidFeedback.innerTHML = '';

loaderCont.innerHTML = PRELOADING;
setTimeout(() => {
    loaderCont.classList.add('d-none');
    signupCont.classList.remove('d-none');
}, 1500);

function generateUsername(input) {
    input.addEventListener('change', function () {
        if (input.value) {
            // const name = input.value.replace(/\s/g, "");
            const str = input.value.split(' ');
            const fname = str[0];
            const lname = str[str.length - 1];

            if (str.length == 1 || !lname) {
                uname.classList.add('is-invalid');
                invalidFeedback.innerHTML = 'Please enter a valid complete name!';
            } else {
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
    uname.classList.add('is-invalid');
    username.classList.add('is-invalid');
    password.classList.add('is-invalid');
}
