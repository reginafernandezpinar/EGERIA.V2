var newTripFlag = true;
var currentTrip = -1;
// get token from url
var token = new URL(window.location.href).searchParams.get('token');

$(document).ready(function () {

    // Get all trips from the user
    $.get(`/mytrips/api/userTrips?token=${token}`, function (trips) {
        console.log(trips);
        trips.forEach(trip => {
            $('#tablerow-trip').append(`
            <tr>
                <td>${trip.name}</td>
                <td>${trip.description}</td>
                <td>${trip.companionship}</td>
                <td>
                    <button class="edit-trip" data-id="${trip.id}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="remove-trip" data-id="${trip.id}">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </td>
            </tr>`);
        });

        addListenersToEditAndDeleteButtons();
    });


    $('#startTrip').on('click', function () {
        // Clear the form
        emptyTripForm();
        // Update flag accordingly
        newTripFlag = true;
    });

    $('#saveButton').on('click', function (event) {
        event.preventDefault(); // prevents page reload by default when button is part of a form
        // Check flag
        if (newTripFlag) {
            // Create a new trip
            let body = {
                name: $('#nameInput').val(),
                description: $('#descriptionTextArea').val(),
                photo: $('#photoInput').val(),
                companionship: $('#companionshipSelect option:selected').text()
            };
            $.ajax({
                type: 'POST',
                url: '/mytrips/api/new',
                data: body,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", token); // before sending the req it provides the token in the header to be available
                },
                success: (trip) => {
                    alert('Trip successfully created');
                    // Empty the form fields
                    emptyTripForm();
                    //Add new row
                    $('#tablerow-trip').append(`
                    <tr>
                        <td>${trip.name}</td>
                        <td>${trip.description}</td>
                        <td>${trip.companionship}</td>
                        <td>
                            <button class="edit-trip" data-id="${trip.id}">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="remove-trip" data-id="${trip.id}">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>`
                    );
                    addListenersToEditAndDeleteButtons();
                }
            });
        } else {
            // Update existing trip
            let body = {
                name: $('#nameInput').val(),
                description: $('#descriptionTextArea').val(),
                photo: $('#photoInput').val(),
                companionship: $('#companionshipSelect option:selected').text()
            };
            $.ajax({
                type: 'PATCH',
                url: `/mytrips/api/${currentTrip}`,
                data: body,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", token); // before sending the req it provides the token in the header to be available
                },
                success: () => {
                    alert('Trip updated successfully');
                    window.location = window.location.href; // reload page
                }
            });
        }
    });
});


// This function clears all fields from the trip form
function emptyTripForm() {
    $('#nameInput').val('');
    $('#photoInput').val('');
    $('#descriptionTextArea').val('');
}


// This function deletes or edits a trip row that was dinamically created 
function addListenersToEditAndDeleteButtons() {
    // Delete a trip
    $('.remove-trip').on('click', (event) => {
        if (confirm('Are you sure you want to remove the trip?')) {
            let currentButton = event.currentTarget;
            let tripId = $(currentButton).attr('data-id'); // no $this because 'this' refers to the endpoint at line6

            $.ajax({
                type: 'DELETE',
                url: `/mytrips/api/${tripId}`,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", token); // before sending the req it provides the token in the header to be available
                },
                success: () => {
                    $(currentButton).parent().parent().remove();
                }
            });
        }
    });

    // Update a trip
    $('.edit-trip').on('click', (event) => {

        newTripFlag = false;

        let editButton = event.currentTarget;
        currentTrip = $(editButton).attr('data-id');

        $.get(`/mytrips/api/trips/${currentTrip}`, function (trips) {
            trips.forEach(trip => {
                $('#nameInput').val(trip.name);
                $('#companionshipSelect option:selected').text(trip.companionship);
                $('#descriptionTextArea').val(trip.description);
                $('#photoInput').val(trip.photo);
            });
        });
    });
}
