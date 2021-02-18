const button = document.querySelector('.btn')
const form   = document.querySelector('.form')

// button.addEventListener('click', function() {
//    form.classList.add('form--no') 
// });

button.addEventListener('click', (redirect) => {
    location.href = '/users/add_user'
 });