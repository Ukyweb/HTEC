function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/data.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    };
    xobj.send(null);

}

// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    var jsonresponse = JSON.parse(response);

    var cars = jsonresponse.cars;

    //console.log(cars[0].name);


    var ul = document.getElementById("demo");
    for ( var i=0; i<cars.length; i++ ) {

        ul.innerHTML +=
            '<li id="'+ cars[i].id +'" class="cars">'

                + '<div class="cars_body">'

                    + '<span class="helper"></span>'

                    + '<h3>' + cars[i].name + '</h3>'

                    + '<img src=' + cars[i].image + ' >'

                + '</div>'

            + '</li>';

    }

});