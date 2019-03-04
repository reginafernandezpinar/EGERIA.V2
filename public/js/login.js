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
            console.log(body);
            //toastr.success('User successfully created'); to implement in final project
            alert(`Hello ${res.username}!, you have been successfully registered`);
            res.render('login'); //
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
            res.render('index'); // login index
        })
    })



})