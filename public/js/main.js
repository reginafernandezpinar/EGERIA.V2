$(document).ready(function () {

    // get token from url if exists (https://stackoverflow.com/questions/33265812/best-http-authorization-header-type-for-jwt)
    var token = new URL(window.location.href).searchParams.get('token');
    
    if (token) {
        $('#publicNavbar').hide();
        $('#navbarNavAltMarkup').append(`
            <div class="navbar-nav">
                <a class="nav-item nav-link text-white mr-4" href="/mytrips/?token=${token}">My trips</a>
                <a class="nav-item nav-link text-white mr-4" href="/auth/logout">Log out</a>
            </div>`);
        // get username from token:
        $.ajax({
            type: 'GET',
            url: '/auth/whoAmI',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", token); // before sending the req it provides the token in the header to be available
            },
            success: (res) => {
                // res is the username value in the user object
                $('#welcomeMessage').append(`<h4 class="mt-3 font-weight-light">Welcome ${res}</h4`)
            }
        });
    }

    // Get first 3 (featured) trips. Featured parameter will be implemented in the final project
    $.get('/mytrips/api/trips?limit=3&featured=true', function (trips) {
        console.log(trips);
        for (let i = 0; i < trips.length; i++) {
            let trip = trips[i];

            let active = '';
            if (i === 0) {
                active = 'active';
            }

            $('#listTrips').append(`<div id="${trip.id}" class="carousel-item ${active} trip-slide" data-interval="10000"
                style="background-image: linear-gradient(
                    rgba(0, 0, 0, 0.7), 
                    rgba(0, 0, 0, 0.7)
                  ), url('${trip.photo}');">
                </div>`);
        }
        // carrousel inside - optional:
        // <div class="carousel-caption d-none d-md-block">
        //  <h1>${trip.name}</h1>
        //  <p>${trip.description}</p>
        //</div>
    });


    // Get all trips
    $.get('/mytrips/api/trips', function (trips) {
        console.log(trips);
        trips.forEach(trip => {
            $('#cards-container').append(`
            <div class="col-sm-4 mb-3">
                <div class="card trip-card">
                    <div class="trip-card-image" style="background-image: url('${trip.photo}');">
                    </div>
                    <a href="/trips/${trip.id}?token=${token}">
                        <div class="card-body text-dark">
                            <h5 class="card-title">${trip.name}</h5>
                            <p class="card-text">${trip.description}</p>
                        </div>
                    </a>
                </div>
            </div>`);
        });
    });

    let viewer = new Cesium.Viewer('cesiumContainer', {
        homeButton: false,
        animation: false
    });

});
