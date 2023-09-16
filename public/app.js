(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form')

    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })

    //Loading function
    const PRELOADING = "<div class='loader'><i class='fa fa-spin fa-spinner text-primary' style='font-size: 50px'></i></div>";
    const landingIndex = document.querySelector('.landing-index');
    const loaderCont = document.querySelector('.loader-cont');

    loaderCont.innerHTML = PRELOADING;
    setTimeout(() => {
        loaderCont.classList.add('d-none');
        landingIndex.classList.remove('d-none');
    }, 1500);
})()

// setTimeout(function () {
//     const alert = document.querySelector('.alert-dismissible');
//     alert.classList.toggle('fade');
//     setTimeout(() => {
//         alert.classList.add('d-none');
//     }, 100)
// }, 5000);