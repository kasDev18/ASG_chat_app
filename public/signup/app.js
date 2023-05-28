const PRELOADING = "<div class='loader'><i class='fa fa-spin fa-spinner text-primary' style='font-size: 50px'></i></div>";

const signupCont = document.querySelector('.signup');
const loaderCont = document.querySelector('.loader-cont');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const username = document.getElementById('username');

loaderCont.innerHTML = PRELOADING;
setTimeout(() => {
    loaderCont.classList.add('d-none');
    signupCont.classList.remove('d-none');
}, 1500);

function generateUsername(input) {
    input.addEventListener('change', () => {
        if (fname.value && lname.value) {
            username.value = fname.value.slice(0, 1).toLowerCase() + '.' + lname.value.toLowerCase() + '@chatapp.com';
        };
    })
}

generateUsername(fname);
generateUsername(lname);