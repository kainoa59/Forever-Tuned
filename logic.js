$(document).ready(function () {

    function start() {
        $("#results-page").hide();
    }
    start();
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAC9ea5OQi6SgC_qrunpuIU9fcLns2hx3o",
        authDomain: "forever-tuned.firebaseapp.com",
        databaseURL: "https://forever-tuned.firebaseio.com",
        projectId: "forever-tuned",
        storageBucket: "",
        messagingSenderId: "602338472078"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function () {
        event.preventDefault();

        function results() {
            $("#home-page").hide();
            $("#results-page").show();
        }
        results();

        var artist = $("#inputartist").val().trim();
        var song = $("#inputsong").val().trim();

        var newSearch = {
            Artist_Name: artist,
            Song_Name: song
        };

        $("#song-info").text(artist + ", " + song);

        database.ref().push(newSearch);

        var apiKeysound = "a4af9743e17e832c4290086100d426eb"
        var queryURLsound = "http://ws.audioscrobbler.com/2.0/?method=track.search&artist=" + artist + "&track=" + song + "&limit=1&api_key=" + apiKeysound + "&format=json";

        $.ajax({
            url: queryURLsound,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#video-info").text(JSON.stringify(response.results.trackmatches.track[0].url));
        });

        var apiKeylyrics = "uEQ4LMmu0zqIhJMQINQ5Ork44T2IVrJa5jLwcP3IgRaRkfFD8B4YYh70QwUJlZyP"
        var queryURLlyrics = "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + song + "?apikey=" + apiKeylyrics;

        $.ajax({
            url: queryURLlyrics,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#lyrics-info").text(response.result.track.text);

        });

        $("#inputartist").val("");
        $("#inputsong").val("");

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
