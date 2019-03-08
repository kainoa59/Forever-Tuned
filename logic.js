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
})