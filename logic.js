$(document).ready(function () {

    var groove = ["SING", "DANCE", "CHILL", "GROOVE", "TUNE", "SOUL"];

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

        $("#song-info").text("Artist: " + artist + " " + " " + " Song: " + song);

        database.ref().push(newSearch);

        
        var apiKeysound = "AIzaSyBYp_njPW6hIPoVLUI_kihLhAA8TkRXRfE"
        var queryURLsound = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + artist + "+" + song + "&key=" + apiKeysound; 

        $.ajax({
            url: queryURLsound,
             method: "GET"
         }).then(function (response) {
             console.log(response);
             var video = $("#video-info");
             video.attr('src', "https://www.youtube.com/embed/" + response.items[0].id.videoId);
             video.attr({ width: '600px', height: '300px' });
             video.css({left: '50%'});

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
        var newRow = $("<tr class='clickable-row' id='rowButton'>").append(
            $("<td>").text(artist),
            $("<td>").text(song),
        );
        
        $("#table > tbody").append(newRow);
        
        // $(".clickable-row").click(function(){
        //     function results() {
        //         $("#home-page").hide();
        //         $("#results-page").show();
        //     }
        //     results();
        //     console.log("hello");
            
        // });
    });
        
})
