const PRELOADING = "<div class='loader'><i class='fa fa-spin fa-spinner text-primary' style='font-size: 50px'></i></div>";

const signupCont = document.querySelector('.signup');
const loaderCont = document.querySelector('.loader-cont');
const uname = document.getElementById('name');
const username = document.getElementById('username');

loaderCont.innerHTML = PRELOADING;
setTimeout(() => {
    loaderCont.classList.add('d-none');
    signupCont.classList.remove('d-none');
}, 1500);

function generateUsername(input) {
    input.addEventListener('change', () => {
        if (input.value) {
            username.value = input.value.toLowerCase() + '@chatapp.com';
        };
    })
}

generateUsername(uname);

// const alertDanger = document.querySelector('.alert-danger');
// const alertSuccess = document.querySelector('.alert-success');

// function hideAlert(alert) {
//     setTimeout(() => {
//         $('.alert-danger').toggle('slow');
//     }, 1000);
// }