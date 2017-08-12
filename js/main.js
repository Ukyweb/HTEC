// getting data from json
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

var cars;

// getting cars from json
loadJSON(function(response) {

    var jsonresponse = JSON.parse(response);

    cars = jsonresponse.cars;

    var ul = document.getElementById("car_list");
    for ( var i=0; i<cars.length; i++ ) {

        ul.innerHTML +=
            '<li id="'+ cars[i].id +'" class="cars borders" onclick="chooseCars(this)" value="0">'

                + '<div class="flip_container">'

                    + '<div class="flipper">'

                        + '<div class="cars_body borderR">'

                            + '<span class="helper"></span>'
                            + '<img src=' + cars[i].image + ' >'

                            + '<h3>' + cars[i].name + '</h3>'

                        + '</div>'

                        + '<div class="cars_back borderR">'

                            + '<span class="helper"></span>'
                            + '<img src=' + cars[i].image + ' >'

                            + '<div class="cars_info" value="' + cars[i].speed + '">'

                                + '<span>Speed:' + cars[i].speed + '</span>'

                                + '<p>' + cars[i].description + '</p>'

                            + '</div>'

                        + '</div>'

                    + '</div>'

                + '</div>'

            + '</li>';

    }

    borderBottom();
    raceTrack(jsonresponse);
});

// separating last row of car list
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

// filter car function
function myFilter() {
    var input, inputV, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    inputV = input.value;
    console.log(inputV);
    filter = input.value.toUpperCase();
    ul = document.getElementById("car_list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            li[i].classList.add("searched");

        } else {
            li[i].style.display = "none";
            li[i].classList.remove("searched");
        }
        if (input.value == '') {
            li[i].classList.remove("searched");
        }
    }
}

var car1, car2, car3, divCar1, divCar2, divCar3, car1Speed, car2Speed, car3Speed;

// choosing cars and adding image to race tracks
function chooseCars(obj) {
    var value, id, divCar1div, divCar2div, divCar3div, url, info;
    value = obj.value;
    id = obj.id;
    url = obj.getElementsByTagName("img");
    url = url[0].src;
    info = obj.getElementsByClassName("cars_info");
    info = info[0].getAttribute("value");

    divCar1 = document.getElementById("car1");
    divCar1div = divCar1.getElementsByTagName('div');
    divCar2 = document.getElementById("car2");
    divCar2div = divCar2.getElementsByTagName('div');
    divCar3 = document.getElementById("car3");
    divCar3div = divCar3.getElementsByTagName('div');

    if (value==1) {
        obj.setAttribute("value", "0");
        obj.classList.remove("borderRed");
        car1 = undefined;
        divCar1div[0].style.backgroundImage = ('');
        car1Speed = undefined;
    } else if (value==2) {
        obj.setAttribute("value", "0");
        obj.classList.remove("borderRed");
        car2 = undefined;
        divCar2div[0].style.backgroundImage = ('');
        car2Speed = undefined;
    } else if (value==3) {
        obj.setAttribute("value", "0");
        obj.classList.remove("borderRed");
        car3 = undefined;
        divCar3div[0].style.backgroundImage = ('');
        car3Speed = undefined;

    } else if (car1 !== undefined && car2 !== undefined && car3 !== undefined) {
        alert("max number of cars is selected")

    } else {

        if (car1 == undefined && value==0) {
            obj.setAttribute("value", "1");
            obj.classList.add("borderRed");
            car1 = id;
            divCar1div[0].style.backgroundImage = ('url(' + url +')');
            car1Speed = info;
            //console.log(car1Speed);
        } else if ( car1 !== undefined && car2 == undefined && value==0) {
            obj.setAttribute("value", "2");
            obj.classList.add("borderRed");
            car2 = id;
            divCar2div[0].style.backgroundImage = ('url(' + url +')');
            car2Speed = info;
        } else if ( car1 !== undefined && car2 !== undefined && value==0) {
            obj.setAttribute("value", "3");
            obj.classList.add("borderRed");
            car3 = id;
            divCar3div[0].style.backgroundImage = ('url(' + url +')');
            car3Speed = info;
        }
    }
}
var raceT, raceTrackL, speedLimits, trafficLight, n1;

// position of markers, speed limits and traffic lights
function raceTrack(jsonresponse) {
    var raceM, raceE, trackDistance, speedLimitsPos, trafficLightPos, trafficLightId, trLight, trTime, i, p, k, n10;
    raceT = document.getElementById("race_track");
    raceM = document.getElementById("race_markers");
    raceE = document.getElementById("race_events");
    raceTrackL = raceT.offsetWidth;

    trackDistance = jsonresponse.distance;
    speedLimits = jsonresponse.speed_limits;
    trafficLight = jsonresponse.traffic_lights;

    // Track Nth - units n1=1km=px
    n1 = raceTrackL/trackDistance;
    n10 = trackDistance/10;

    // marker positions
    for ( i = 1; i < 10; i++) {
        raceM.innerHTML +=
            '<div class="distMarker" style="left: ' + n1*n10*i + 'px">'
                + '<p>' + n10*i +'km' + '</p>'
                + '<span></span>'
            +'</div>';
    }

    // position for speed limits
    for ( p = 0; p < speedLimits.length; p++) {
        speedLimitsPos = speedLimits[p].position;
        raceE.innerHTML +=
            '<div class="speed_limit" style="left: ' + n1*speedLimitsPos + 'px">'
                + '<span></span>'
                + '<p>' + speedLimits[p].speed + '</p>'
            + '</div>';
    }

    // position and animation for traffic lights
    for ( k = 0; k < trafficLight.length; k++) {
        trafficLightPos = trafficLight[k].position;
        trafficLightId = "trLight" + k;
        raceE.innerHTML +=
            '<div id="' + trafficLightId + '" class="traffic_light" style="left: ' + n1*trafficLightPos + 'px" value="0">'
                + '<span></span>'
                + '<div class="borderR">'
                    + '<span></span>'
                    + '<span></span>'
                + '</div>'
            + '</div>';

        trLight = document.getElementById(trafficLightId);
        trTime = trafficLight[k].duration;

        var x;
        setInterval(function () {
            if (x == undefined) {
                trLight.classList.add("green");
                trLight.setAttribute("value", "1");
                x = 1;
            } else if (x == 1) {
                trLight.classList.remove("green");
                trLight.setAttribute("value", "0");
                x = undefined;
            }
        }, trTime);
    }
}
// cars race animation and traffic lights and speed limits
function carRace() {
    var carLength, raceLength, left1, left2, left3, speed, speed1, speed2, speed3, places, slowest, animation;

    carLength = document.getElementById("car1").offsetWidth;
    raceLength = raceTrackL - carLength - 4; // 4 is for borders

    animation = document.getElementById("animation_speed").value;

    if (animation == 0) {
        animation = 1;
    }

    document.getElementById("race_start").disabled = true;

    if (car1 !== undefined && car2 !== undefined && car3 !== undefined) {

        speed1 = car1Speed/100;
        speed2 = car2Speed/100;
        speed3 = car3Speed/100;

        speed = 10 / animation;

        left1 = 0;
        left2 = 0;
        left3 = 0;

        // sort chosen cars by speed
        places = [
            { name: 'car1', value: car1Speed },
            { name: 'car2', value: car2Speed },
            { name: 'car3', value: car3Speed }
        ];
        places.sort(function (a, b) {
            return b.value - a.value;
        });

        // slowest car
        slowest = places[2].name;

        // add classes(medals) to cars by their speed (not counted for race)
        function medals(carName) {
            if (slowest == carName) {
                document.getElementById(places[0].name).classList.add("gold");
                document.getElementById(places[1].name).classList.add("silver");
                document.getElementById(places[2].name).classList.add("bronze");

                document.getElementById("race_start").disabled = false;
            }
        }

        // position of first speed limit or traffic light
        function min(s1) {
            var arr = [];

            for (var g = 0; g < speedLimits.length; g++) {
                var maxPosL = speedLimits[g].position * n1;
                var minPosL = maxPosL - s1 - carLength;

                arr.push(minPosL);
            }for (var h = 0; h < trafficLight.length; h++) {
                var maxPosT = trafficLight[h].position * n1;
                var minPosT = maxPosT - s1 - carLength;

                arr.push(minPosT);
            }
            var minS = Math.min.apply(Math, arr);
            return minS;
        }
        var min1 = min(speed1);
        var min2 = min(speed2);
        var min3 = min(speed3);

        // car1 animation
        var travel1 = setInterval(move1, speed);
        function move1() {

            if (left1 >= raceLength) {
                clearInterval(travel1);
                medals("car1");
            }

            if (left1 <= min1) {
                left1 += speed1;
                divCar1.style.left = left1 + 'px';
            }

            //for traffic lights
            for (var h = 0; h < trafficLight.length; h++) {
                var maxPosST = trafficLight[h].position * n1 - carLength;
                var minPosST = maxPosST - speed1;
                var speedT = 0;
                var lightId = "trLight" + h;
                var lightV = document.getElementById(lightId).getAttribute("value");

                if (left1 >= minPosST && left1 <= maxPosST && lightV == 0) {
                    left1 += speedT;
                    divCar1.style.left = left1 + 'px';
                } else {

                    // for speed Limits
                    for (var j = 0; j < speedLimits.length; j++) {
                        var maxPosSL = speedLimits[j].position * n1 - carLength;
                        var minPosSL = maxPosSL - speed1;
                        var speedL = speedLimits[j].speed/100;

                        if (left1 > minPosSL) {
                            left1 += speedL;
                            divCar1.style.left = left1 + 'px';
                        }
                    }
                }
            }
            if (speedLimits.length == 0 && trafficLight.length == 0) {
                left1 += speed1;
                divCar1.style.left = left1 + 'px';
            }
        }

        //car2 animation
        var travel2 = setInterval(move2, speed);
        function move2() {
            if (left2 >= raceLength) {
                clearInterval(travel2);
                medals("car2");
            }

            if (left2 <= min2) {
                left2 += speed2;
                divCar2.style.left = left2 + 'px';
            }

            //for traffic lights
            for (var h = 0; h < trafficLight.length; h++) {
                var maxPosST = trafficLight[h].position * n1 - carLength;
                var minPosST = maxPosST - speed2;
                var speedT = 0;
                var lightId = "trLight" + h;
                var lightV = document.getElementById(lightId).getAttribute("value");

                if (left2 >= minPosST && left2 <= maxPosST && lightV == 0) {
                    left2 += speedT;
                    divCar2.style.left = left2 + 'px';
                } else {

                    // for speed Limits
                    for (var j = 0; j < speedLimits.length; j++) {
                        var maxPosSL = speedLimits[j].position * n1 - carLength;
                        var minPosSL = maxPosSL - speed2;
                        var speedL = speedLimits[j].speed/100;

                        if (left2 > minPosSL) {
                            left2 += speedL;
                            divCar2.style.left = left2 + 'px';
                        }
                    }
                }
            }
            if (speedLimits.length == 0 && trafficLight.length == 0) {
                left2 += speed2;
                divCar2.style.left = left2 + 'px';
            }
        }

        // car3 animation
        var travel3 = setInterval(move3, speed);
        function move3() {
            if (left3 >= raceLength) {
                clearInterval(travel3);
                medals("car3");
            }

            if (left3 <= min3) {
                left3 += speed3;
                divCar3.style.left = left3 + 'px';
            }

            //for traffic lights
            for (var h = 0; h < trafficLight.length; h++) {
                var maxPosST = trafficLight[h].position * n1 - carLength;
                var minPosST = maxPosST - speed3;
                var speedT = 0;
                var lightId = "trLight" + h;
                var lightV = document.getElementById(lightId).getAttribute("value");

                if (left3 >= minPosST && left3 <= maxPosST && lightV == 0) {
                    left3 += speedT;
                    divCar3.style.left = left3 + 'px';
                } else {

                    // for speed Limits
                    for (var j = 0; j < speedLimits.length; j++) {
                        var maxPosSL = speedLimits[j].position * n1 - carLength;
                        var minPosSL = maxPosSL - speed3;
                        var speedL = speedLimits[j].speed/100;

                        if (left3 > minPosSL) {
                            left3 += speedL;
                            divCar3.style.left = left3 + 'px';
                        }
                    }
                }
            }
            if (speedLimits.length == 0 && trafficLight.length == 0) {
                left3 += speed3;
                divCar3.style.left = left3 + 'px';
            }
        }
    }
}