$(document).ready(function () {

    // register user
    $('#signup').on('click', function (event) {
        event.preventDefault();
        let body = {
            username: $('#usernameInput').val(),
            email: $('#emailInput1').val(),
            password: $('#passwordInput1').val()
        };
        $.post('/auth/register', body, function (res) {
            console.log(res);
            alert(`Hello ${body.username}!, you have been successfully registered`);
            emptyUserForm();
            // res.render('login'); is not a function
            // alert (Hello ${res.username}!... ) undefined
        })
    })

    // login user
    $('#login').on('click', function (event) {
        event.preventDefault();
        let data = {
            email: $('#emailInput2').val(),
            password: $('#passwordInput2').val()
        }
        $.post('/auth/login', data, function (res) {
            console.log(res);
        })
    })

});


function emptyUserForm() {
    $('#usernameInput').val('');
    $('#emailInput1').val('');
    $('#passwordInput1').val('');
}

