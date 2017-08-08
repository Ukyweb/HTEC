<!DOCTYPE html>
<html lang="en">
<head>
    <title>Place searches</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">

    <script src="js/main.js"></script>
</head>
<body>
    <div class="container">

        <div id="search">
            <input type="text" id="myInput" class="borderR" onkeyup="myFilter()" placeholder="Search for car names.." title="Type in a car name">
        </div>

        <ul id="car_list"></ul>


        <div id="race">
            <div id="race_markers"></div>
            <div id="race_events"></div>
            <div id="race_track" class="borderR">
                <div id="track1" class="tracks">
                    <div id="car1" class="borderR track_cars"></div>
                </div>
                <div id="track2" class="tracks">
                    <div id="car2" class="borderR track_cars"></div>
                </div>
                <div id="track3" class="tracks">
                    <div id="car3" class="borderR track_cars"></div>
                </div>
            </div>
        </div>

    </div>
</body>
</html>