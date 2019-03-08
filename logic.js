$(document).ready(function () {

    function start() {
        $("#results-page").hide();
    }
    start();

    var artist = "Halsey";
    var song = "Without Me";

    var apiKeysound = "a4af9743e17e832c4290086100d426eb"
    var queryURLsound = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + song + "&api_key=" + apiKeysound + "&format=json";

    $.ajax({
        url: queryURLsound,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

    var artist = "Halsey";
    var song = "Without Me";

    var apiKeylyrics = "uEQ4LMmu0zqIhJMQINQ5Ork44T2IVrJa5jLwcP3IgRaRkfFD8B4YYh70QwUJlZyP"
    var queryURLlyrics = "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + song + "?apikey=" + apiKeylyrics;

    $.ajax({
        url: queryURLlyrics,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

    $("#submit").on("click", function () { 
        event.preventDefault();
        function results() {
            $("#home-page").hide();
            $("#results-page").show();
        }
        results();
    });

    $("#top-hits").on("click", function () { 
        event.preventDefault();
        function results() {
            $("#home-page").hide();
            $("#results-page").show();
        }
        results();
    });

    $("#home").on("click", function () { 
        event.preventDefault();
        function goHome() {
            $("#home-page").show();
            $("#results-page").hide();
        }
        goHome();
    });

    $("#top").on("click", function () { 
        event.preventDefault();
        function top() {
            $("#results-page").scrollTop(0);
        }
        top();
    });



})
