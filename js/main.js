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


    var ul = document.getElementById("car_list");
    for ( var i=0; i<cars.length; i++ ) {

        ul.innerHTML +=
            '<li id="'+ cars[i].id +'" class="cars borders" onclick="chooseCars(this)" value="0">'

                + '<div class="flipper">'

                    + '<div class="cars_body">'

                        + '<span class="helper"></span>'
                        + '<img src=' + cars[i].image + ' >'

                        + '<h3>' + cars[i].name + '</h3>'

                    + '</div>'

                    + '<div class="cars_back">'

                        + '<span class="helper"></span>'
                        + '<img src=' + cars[i].image + ' >'

                        + '<div class="cars_info">'

                            + '<span>Speed:' + cars[i].speed + '</span>'

                            + '<p>' + cars[i].description + '</p>'

                        + '</div>'

                    + '</div>'

                + '</div>'

            + '</li>';

    }

    borderBottom();
});

function borderBottom() {
    var ul, li, i, liLeng, liLeftOver, liRound;
    ul = document.getElementById("car_list");
    li = ul.getElementsByTagName("li");
    liLeng = li.length;
    liLeftOver = liLeng%3;
    liRound = liLeng - liLeftOver;

    for (i = 0; i < liRound; i++) {
        li[i].classList.add("border_bottom");
    }
}

function myFilter() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("car_list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            li[i].classList.add("borders");

        } else {
            li[i].style.display = "none";
            li[i].classList.remove("borders");
        }
    }
}
var car1, car2, car3;
function chooseCars(obj) {
    var value, id;
    value = obj.value;
    id = obj.id;

    if (value==1) {
        obj.setAttribute("value", "0");
        obj.classList.remove("borderRed");
        car3 = undefined;
    } else if (value==2) {
        obj.setAttribute("value", "0");
        obj.classList.remove("borderRed");
        car2 = undefined;
    } else if (value==1) {
        obj.setAttribute("value", "0");
        obj.classList.remove("borderRed");
        car3 = undefined;

    } else if (car1 !== undefined && car2 !== undefined && car3 !== undefined) {
        alert("max number of cars is selected")

    } else {

        if (car1 == undefined && value==0) {
            obj.setAttribute("value", "1");
            obj.classList.add("borderRed");
            car1 = id;
        } else if ( car1 !== undefined && car2 == undefined && value==0) {
            obj.setAttribute("value", "2");
            obj.classList.add("borderRed");
            car2 = id;
        } else if ( car1 !== undefined && car2 !== undefined && value==0) {
            obj.setAttribute("value", "3");
            obj.classList.add("borderRed");
            car3 = id;
        }
    }
}