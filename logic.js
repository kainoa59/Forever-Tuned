$(document).ready(function () {

    var groove = ["sing", "dance", "chill", "groove", "tune", "soul"];

    var showGroove;

    var count = 0;

    function showGroove(){
        $("#tune-out").text(groove[count]);
        count++;
        if (count === groove.length){
            count = 0;
        }
    }
    setInterval(showGroove, 2000);

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


        // Load the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        
        var youTubeSrc = "https://www.youtube.com/embed?listType=search&list=" + artist + song;

        tag.src = youTubeSrc

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Replace the 'ytplayer' element with an <iframe> and
        // YouTube player after the API code downloads.
        var player;
        function onYouTubePlayerAPIReady() {
            player = new YT.Player('ytplayer', {
                height: '360',
                width: '640',
                videoId: 'M7lc1UVf-VE'
            });
        }

        // var apiKeysound = "a4af9743e17e832c4290086100d426eb"
        // var queryURLsound = "http://ws.audioscrobbler.com/2.0/?method=track.search&artist=" + artist + "&track=" + song + "&limit=1&api_key=" + apiKeysound + "&format=json";

        // $.ajax({
        //     url: queryURLsound,
        //     method: "GET"
        // }).then(function (response) {
        //     console.log(response);
        //     var video = $("#video-info");
        //     video.attr('src', response.results.trackmatches.track[0].url);


        // });

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
            window.scrollTo(0, 0);
        }
        top();
    });
    database.ref().on("child_added", function (childSnapshot) {
        // console.log(childSnapshot.val());
        var artist = childSnapshot.val().Artist_Name;
        var song = childSnapshot.val().Song_Name;

        // console.log(artist);
        // console.log(song);
        var newRow = $("<tr>").append(
            $("<td>").text(artist),
            $("<td>").text(song),
        )

        $("#table > tbody").append(newRow);
    });


})
