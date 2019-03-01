$(document).ready(function () {

    // Get first 3 (featured) trips. Featured parameter will be implemented in the final project
    $.get('/api/trips?limit=3&featured=true', function (trips) {
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
        // inside carrousel optional:
        // <div class="carousel-caption d-none d-md-block">
        //  <h1>${trip.name}</h1>
        //  <p>${trip.description}</p>
        //</div>
    });


    // Get all trips
    $.get('/api/trips', function (trips) {
        console.log(trips);

        trips.forEach(trip => {
            $('#cards-container').append(`
            <div class="col-sm-4 mb-3">
                <div class="card trip-card">
                    <div class="trip-card-image" style="background-image: url('${trip.photo}');">
                    </div>
                    <a href="/trips/${trip.id}">
                        <div class="card-body text-dark">
                            <h5 class="card-title">${trip.name}</h5>
                            <p class="card-text">${trip.description}</p>
                        </div>
                    </a>
                </div>
            </div>`);
        });
    });


      // var viewer = new Cesium.Viewer('cesiumContainer', {
    //     homeButton: false,
    //     animation: false
    // });


});
