var map = null;
var locations = [];
var checked = {};
var serviceType = {shop: true, track: true};
$(document).ready(function () {
    getData();


});
var geocoder;
var searchBox;
function initMap(locations, things) {
    var spinner = 20;
    geocoder = new google.maps.Geocoder();
    var open = false;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 37, lng: -100},
        scaleControl: true,
        minZoom: 4,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        streetViewControl: false

    });
    clicks();

    var input = document.getElementById('new-address');
    searchBox = new google.maps.places.SearchBox(input);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    function goTo(locations) {

        $('.places-list-item').on("click", function (e) {
            var id = this.id;
            e.preventDefault();
            for (var i = 0; i < locations.length; i++) {
                if (id == locations[i].name) {
                    map.setZoom(17);
                    map.setCenter(locations[i]);
                    $('#description').show();
                    $('#search-div').hide();
                    $('#places').hide();
                    $('#places-tab').show();

                    $('.header').text(locations[i].name);
                    $('#website-text').text(locations[i].website).attr("href", marker.website);
                    $('#phone-text').text(locations[i].phone);
                    $('#address-text').text(locations[i].address);

                }
            }
        })

    }

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction

    navigator.geolocation.getCurrentPosition(function (location) {

            var currentLat = location.coords.latitude;
            var currentLng = location.coords.longitude;
            for (i = 0; i < locations.length; i++) {
                locations[i]["distance"] = calculateDistance(currentLat, currentLng, locations[i].lat, locations[i].lng, "K");

            }
            locations.sort(function (a, b) {

                return a.distance - b.distance;
            });


            $('#places-load').hide();
            for (i = 0; i < '12'; i++) {
                $("#places-list").append('<li class="places-list-item" id="' + locations[i].name + '">' + locations[i].name + '</li>');

            }
            goTo(locations);
            $('#search-text').autocomplete({
                source: things,
                messages: {
                    noResults: '',
                    results: function () {
                    }
                },
                select: function (event, ui) {
                    var text = $('#search-text').val();
                    for (var i = 0; i < locations.length; i++) {
                        if (text == locations[i].name) {
                            map.setZoom(17);
                            map.setCenter(locations[i]);
                            $('#description').show();
                            $('#search-div').hide();
                            $('#places').hide();
                            $('#places-tab').show();

                            $('.header').text(locations[i].name);
                            $('#website-text').text(locations[i].website).attr("href", marker.website);
                            $('#phone-text').text(locations[i].phone);
                            $('#address-text').text(locations[i].address);

                        }
                    }
                },
                open: function () {
                    $('#places').hide();
                    $('#description').hide();
                    $('#search-div').show();
                    $('.header').text('Search Results');
                    $('#places-tab').show();
                    $(this).autocomplete("widget")
                        .appendTo("#search-results")
                        .css("position", "static");
                    $(".ui-menu").wrap("<div class='result'></div>");
                    $(".result").wrap("<div class='main-result'></div>");
                }
            });
        },
        function (error) {
            console.log('Cannot detect geolocation.');
            $('#places-load').hide();
            for (i = 0; i < '12'; i++) {
                $("#places-list").append('<li class="places-list-item" id="' + locations[i].name + '">' + locations[i].name + '</li>');

            }
            goTo(locations);
            $('#search-text').autocomplete({
                source: things,
                messages: {
                    noResults: '',
                    results: function () {
                    }
                },
                select: function (event, ui) {
                    var text = $('#search-text').val();
                    for (var i = 0; i < locations.length; i++) {
                        if (text == locations[i].name) {
                            map.setZoom(17);
                            map.setCenter(locations[i]);
                            $('#description').show();
                            $('#search-div').hide();
                            $('#places').hide();
                            $('#places-tab').show();

                            $('.header').text(locations[i].name);
                            $('#website-text').text(locations[i].website).attr("href", marker.website);
                            $('#phone-text').text(locations[i].phone);
                            $('#address-text').text(locations[i].address);

                        }
                    }
                },
                open: function () {
                    $('#places').hide();
                    $('#description').hide();
                    $('#search-div').show();
                    $('.header').text('Search Results');
                    $('#places-tab').show();
                    $(this).autocomplete("widget")
                        .appendTo("#search-results")
                        .css("position", "static");
                    $(".ui-menu").wrap("<div class='result'></div>");
                    $(".result").wrap("<div class='main-result'></div>");
                }
            });
        });

    var image = '../static/pictures/car-marker.png';
    var image2 = '../static/pictures/hobby-shop.png';
    var image3 = '../static/pictures/both.png';
    var length = Object.keys(locations).length;

    var markers = [];
    for (var i = 0; i < length; i++) {
        var tags = JSON.parse(locations[i].tags);
        if (tags.shop) {
            if (tags.tracks && tags.tracks.length > 0) {
                var marker = new google.maps.Marker({
                    position: locations[i],
                    map: map,
                    name: locations[i].name,
                    icon: image3,
                    address: locations[i].address,
                    phone: locations[i].phone,
                    website: locations[i].website
                });
                attachSecretMessage(marker, marker.name);
                markers.push(marker);
            }
            else {
                var marker = new google.maps.Marker({
                    position: locations[i],
                    map: map,
                    icon: image2,
                    name: locations[i].name,
                    address: locations[i].address,
                    phone: locations[i].phone,
                    website: locations[i].website
                });
                attachSecretMessage(marker, marker.name);
                markers.push(marker);
            }
        }

        else {
            var marker = new google.maps.Marker({
                position: locations[i],
                map: map,
                name: locations[i].name,
                icon: image,
                address: locations[i].address,
                phone: locations[i].phone,
                website: locations[i].website
            });
            attachSecretMessage(marker, marker.name);
            markers.push(marker);
        }
    }


    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


    //noinspection JSUnresolvedFunction
    var open;

    function attachSecretMessage(marker, secretMessage) {
        var infowindow = new google.maps.InfoWindow({
            content: secretMessage
        });

        marker.addListener('click', function () {

            infowindow.open(marker.get('map'), marker);
            $('#description').show();
            $('#search-div').hide();
            $('#places').hide();
            $('#places-tab').show();

            $('.header').text(marker.name);
            $('#phone-text').text(marker.phone);
            $('#address-text').text(marker.address);

            $('#website-text').text(marker.website).attr("href", marker.website);

        });
    }

    $('#search-text').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#search-text').focusout();
            $.ajax({
                url: '/send_data',
                type: 'POST',
                contentType: 'application/json',
                success: function (response) {
                    var things = [];
                    $.each(response, function (i, o) {
                        locations.push({
                            lat: parseFloat(o.lat),
                            lng: parseFloat(o.lng),
                            type: o.type,
                            name: o.name,
                            phone: response[i].phone,
                            address: o.address,
                            tags: o.tags,
                            website: o.website
                        });
                        things.push(o.name);
                    });
                    var text = $('#search-text').val();
                    for (var i = 0; i < locations.length; i++) {
                        if (text == locations[i].name) {
                            map.setZoom(17);
                            map.setCenter(locations[i]);
                            $('#description').show();
                            $('#search-div').hide();
                            $('#places').hide();
                            $('#places-tab').show();

                            $('.header').text(locations[i].name);
                            $('#website-text').text(locations[i].website).attr("href", locations[i].website);
                            $('#phone-text').text(locations[i].phone);
                            $('#address-text').text(locations[i].address);

                        }
                    }


                },
                error: function () {
                    location.reload();

                }

            });
        }
    });
    $("#search-button").click(function () {
        $.ajax({
            url: '/send_data',
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                var things = [];
                var locations = [];
                $.each(response, function (i, o) {
                    locations.push({
                        lat: parseFloat(o.lat),
                        lng: parseFloat(o.lng),
                        type: o.type,
                        name: o.name,
                        phone: response[i].phone,
                        address: o.address,
                        tags: o.tags,
                        website: o.website
                    });
                    things.push(o.name);
                });
                var text = $('#search-text').val();
                for (var i = 0; i < locations.length; i++) {
                    if (text == locations[i].name) {
                        map.setZoom(17);
                        map.setCenter(locations[i]);
                        $('#description').show();
                        $('#search-div').hide();
                        $('#places').hide();
                        $('#places-tab').show();

                        $('.header').text(locations[i].name);
                        $('#website-text').text(locations[i].website).attr("href", locations[i].website);
                        $('#phone-text').text(locations[i].phone);
                        $('#address-text').text(locations[i].address);
                    }
                }
                if (open == true) {
                    $('#description-tab').show();
                }
            },
            error: function () {
                location.reload();

            }

        });

    });
    $(".ui-menu-item").click(function () {
        $.ajax({
            url: '/send_data',
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                var things = [];
                var locations = [];
                $.each(response, function (i, o) {
                    locations.push({
                        lat: parseFloat(o.lat),
                        lng: parseFloat(o.lng),
                        type: o.type,
                        name: o.name,
                        phone: response[i].phone,
                        address: o.address,
                        tags: o.tags,
                        website: o.website
                    });
                    things.push(o.name);
                });

                var text = $('#search-text').val();
                for (var i = 0; i < locations.length; i++) {
                    if (text == locations[i].name) {
                        map.setZoom(17);
                        map.setCenter(locations[i]);
                        $('#description').show();
                        $('#search-div').hide();
                        $('#places').hide();
                        $('#places-tab').show();

                        $('.header').text(locations[i].name);
                        $('#website-text').text(locations[i].website).attr("href", locations[i].website);
                        $('#phone-text').text(locations[i].phone);
                        $('#address-text').text(locations[i].address);
                    }
                }
                if (open == true) {
                    $('#description-tab').show();
                }

            },
            error: function () {
                location.reload();

            }

        });

    });

    $('#places-tab').click(function () {
        if (open == true) {
            $('#description-tab').show();
        }
    });

    var materials = [];
    $.each(locations, function (i, o) {
        var tags = JSON.parse(o.tags);
        if (tags.tracks && tags.tracks.length > 0) {
            $.each(tags.tracks, function (i, o) {
                if (o.material.length > 0 && $.inArray(o.material, materials) === -1) {
                    materials.push(o.material)
                }
            })
        }
    });
    $.each(materials, function (i, o) {
        checked[o.toLowerCase()] = true;
        $("#material").append('<li><input class="material" type="checkbox" id="' + o.toLowerCase() + '" name="selector" onclick="checkUncheck(this)" checked><label for="' + o.toLowerCase() + '">' + o + '</label><div class="check"></div></li>');
    });
    var location = [];
    $.each(locations, function (i, o) {
        var tags = JSON.parse(o.tags);
        if (tags.tracks && tags.tracks.length > 0) {
            $.each(tags.tracks, function (i, o) {
                if (o.location.length > 0 && $.inArray(o.location, location) === -1) {
                    materials.push(o.location);
                    location.push(o.location)
                }
            })
        }
    });
    $.each(location, function (i, o) {
        checked[o.toLowerCase()] = true;
        $("#location").append('<li><input class="location" type="checkbox" id="' + o.toLowerCase() + '" name="selector" onclick="checkUncheck(this)" checked><label for="' + o.toLowerCase() + '">' + o + '</label><div class="check"></div></li>');
    });

    var type = [];
    $.each(locations, function (i, o) {
        var tags = JSON.parse(o.tags);
        if (tags.tracks && tags.tracks.length > 0) {
            $.each(tags.tracks, function (i, o) {
                if (o.type.length > 0 && $.inArray(o.type, type) === -1) {
                    materials.push(o.type);
                    type.push(o.type)
                }
            })
        }
    });
    $.each(type, function (i, o) {
        checked[o.toLowerCase()] = true;
        $("#type").append('<li><input class="type" type="checkbox" id="' + o.toLowerCase() + '" name="selector" onclick="checkUncheck(this)" checked><label for="' + o.toLowerCase() + '">' + o + '</label><div class="check"></div></li>');
    });


    // if (document.getElementById("shop-checked").checked) {
    //     alert('hi')
    // }
    // else {
    //     alert('sdfga')
    // }

}

function getData() {
    $.ajax({
        url: '/send_data',
        type: 'POST',
        contentType: 'application/json',
        success: function (response) {
            var things = [];
            $.each(response, function (i, o) {
                locations.push({
                    lat: parseFloat(o.lat),
                    lng: parseFloat(o.lng),
                    name: o.name,
                    phone: response[i].phone,
                    address: o.address,
                    tags: o.tags,
                    website: o.website
                });
                things.push(o.name);
            });
            initMap(locations, things);
        },
        error: function () {
            location.reload();

        }

    });
}
function checkUncheck(type) {
    if (type.id === 'track' || type.id === 'shop') {
serviceType[type.id] = serviceType[type.id] !== true;
    }
    else {checked[type.id] = checked[type.id] !== true;}
    reset(checked)

}
function reset(checked) {

    var image = '../static/pictures/car-marker.png';
    var image2 = '../static/pictures/hobby-shop.png';
    var image3 = '../static/pictures/both.png';
    changeMapType();
    var markers = [];
    $('#places-list').empty();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 37, lng: -100},
        scaleControl: true,
        minZoom: 4,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        streetViewControl: false

    });
    var finished = [];
    for (var i = 0; i < locations.length; i++) {
        var k = finished.indexOf(locations[i].name);
        console.log(k);
        if (finished.indexOf(locations[i].name > 0)) {
            var tags = JSON.parse(locations[i].tags);
            $("#places-list").append('<li class="places-list-item" id="' + locations[i].name + '">' + locations[i].name + '</li>');
            if (tags.shop/* && serviceType.shop === true*/) {
                if (tags.tracks && tags.tracks.length > 0) {
                    if (finished.indexOf(locations[i].name)) {

                        var Continue = false;
                        $.each(tags.tracks, function (l, m) {
                            if (checked[m.material.toLowerCase()] === true && checked[m.location.toLowerCase()] === true && checked[m.type.toLowerCase()] === true) {
                                Continue = true
                            }
                        });

                        if (Continue === true) {
                            console.log(locations[i].name);
                            var marker = new google.maps.Marker({
                                position: locations[i],
                                map: map,
                                name: locations[i].name,
                                icon: image3,
                                address: locations[i].address,
                                phone: locations[i].phone,
                                website: locations[i].website
                            });
                            attachSecretMessage(marker, marker.name);
                            markers.push(marker);
                        }
                    }
                    finished.push()
                }
                else {
                    var marker = new google.maps.Marker({
                        position: locations[i],
                        map: map,
                        icon: image2,
                        name: locations[i].name,
                        address: locations[i].address,
                        phone: locations[i].phone,
                        website: locations[i].website
                    });
                    attachSecretMessage(marker, marker.name);
                    markers.push(marker);
                }
            }

            else {
                var Continue = false;
                $.each(tags.tracks, function (l, m) {
                    if (checked[m.material.toLowerCase()] === true && checked[m.location.toLowerCase()] === true && checked[m.type.toLowerCase()] === true) {
                        Continue = true
                    }
                });


                if (Continue === true) {
                    console.log(locations[i].name);
                    var marker = new google.maps.Marker({
                        position: locations[i],
                        map: map,
                        name: locations[i].name,
                        icon: image,
                        address: locations[i].address,
                        phone: locations[i].phone,
                        website: locations[i].website
                    });
                    attachSecretMessage(marker, marker.name);
                    markers.push(marker);
                }
            }
            finished.push(locations[i].name)
        }

        // }
    }
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    if (document.getElementById("shop-checked").checked = true) {
    }
}

function attachSecretMessage(marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
        content: secretMessage
    });

    marker.addListener('click', function () {

        infowindow.open(marker.get('map'), marker);
        $('#description').show();
        $('#search-div').hide();
        $('#places').hide();
        $('#places-tab').show();

        $('.header').text(marker.name);
        $('#phone-text').text(marker.phone);
        $('#address-text').text(marker.address);
        $('#description-tab').text(marker.name).hide();

        $('#website-text').text(marker.website).attr("href", marker.website);
        open = true;

    });
}


var styles = {
    default: null,
    silver: [
        {
            elementType: 'geometry',
            stylers: [{color: '#f5f5f5'}]
        },
        {
            elementType: 'labels.icon',
            stylers: [{visibility: 'on'}]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [{color: '#f5f5f5'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#bdbdbd'}]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#dadada'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#c9c9c9'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        }
    ],

    night: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
        }
    ],

    retro: [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
        }
    ],

    hiding: [
        {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
        },
        {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
        }
    ]
};

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}
