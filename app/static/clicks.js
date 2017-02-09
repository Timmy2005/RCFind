/**
 * Created by timothy on 12/27/16.
 */
function clicks() {
    setDivs();
    descriptionClicks();
    searchClicks();
    extra();
    detectChange();

}

function searchClicks() {
    var obj = document.getElementById('test');
    $('.search-buttons').on('click', function (e) {
        var id = $(this).attr('id');

        if (id === 'search-button') {
            $('#search-text').focusout();
        }

        if (id === 'menu-button') {
            $('.settings-pane').addClass('settings-pane-open');
            obj.style.opacity = "0.3";
            obj.style.zIndex = "99";

        }

        if (id === 'back-button') {
            $('.settings-pane').removeClass('settings-pane-open');
            obj.style.opacity = "0";
            setTimeout(function () {
                obj.style.zIndex = "0";
            }, 600);

        }

        e.preventDefault();
    });
    $('.settings-dim').on('click', function (e) {
        $('.settings-pane').removeClass('settings-pane-open');
        obj.style.opacity = "0";
        setTimeout(function () {
            obj.style.zIndex = "0";
        }, 600);
        e.preventDefault();
    });
    $('#search-text').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#search-text').focusout();

        }
    });
}

function descriptionClicks() {
    $('.tabs').on('click', function (e) {
        var id = $(this).attr('id');

        if (id === 'places-tab') {
            $('#places').show();
            $('#search-div').hide();
            $('#description').hide();
            $('#places-tab').hide();
            $('.header').text('Places')
        }


        e.preventDefault();
    });
}

function extra() {
    $("#website").hover(function () {
            $("#web-icon").attr("src", "../static/pictures/Asset4.png");
        },
        function () {
            $("#web-icon").attr("src", "../static/pictures/Asset%203.png");
        });
}


function setDivs() {
    $('#places').show();
    $('#search-div').hide();
    $('#description').hide();
    $('.tabs').hide();

}

function newItemError() {

    if ($('#name').val() == '') {
        $('#name').addClass('new-error').attr('placeholder', 'Fill this in');
        $(document).click(function () {
            $('#name').removeClass('new-error');
            $('#new-address').removeClass('new-error');
            $('#name').attr('placeholder', 'Name');
            $('#new-address').attr('placeholder', 'Address');
        });
    }
    else if ($('#new-address').val() == '') {
        $('#new-address').addClass('new-error').attr('placeholder', 'Fill this in');
        $(document).click(function () {
            $('#name').removeClass('new-error');
            $('#new-address').removeClass('new-error');
            $('#name').attr('placeholder', 'Name');
            $('#new-address').attr('placeholder', 'Address');

        })

    }

    else {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': $('#new-address').val()}, function (results, status) {
            if (status == 'OK') {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                var data = {
                    'name': $('#name').val(),
                    'address': $('#new-address').val(),
                    'phone': $('#new-phone').val(),
                    'website': $('#new-website').val(),
                    'notes': $('#notes').val(),
                    'lat': latitude,
                    'lng': longitude
                };
                $('.pending').addClass('pending-true');
                $.ajax({
                    url: '/send_email',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data, null, '\t'),
                    success: function () {
                        $('.pending').removeClass('pending-true');
                        $('#not-sent').hide();
                        $('#sent').show();
                        $(document).click(function () {
                            $('#sent').hide();
                        })
                    },
                    error: function () {
                        $('.pending').removeClass('pending-true');
                        alert('Something went wrong. Please retry.');
                        $('#sent').hide();
                        $('#not-sent').show();
                        $(document).click(function () {
                            $('#not-sent').hide();
                        })

                    }

                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
                $('#sent').hide();
                $('#not-sent').show();
                $(document).click(function () {
                    $('#not-sent').hide();
                })
            }
        });
    }
}

function detectChange() {

}

function changeMapType() {
    var styleSelector = document.getElementById('style-selector');
    map.setOptions({styles: styles[styleSelector.value]});
}