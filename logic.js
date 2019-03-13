$(document).ready(function () {

    var groove = ["SING", "DANCE", "MELODY", "CHILL", "MUSIC", "GROOVE", "TUNE", "SOUL"];

    var showGroove;

    var count = 0;

    function showGroove() {
        $("#tune-out").text(groove[count]);
        count++;
        if (count === groove.length) {
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

        console.log(artist);
        console.log(song);

        var newSearch = {
            Artist_Name: artist,
            Song_Name: song
        };
        
        database.ref().push(newSearch);


        var apiKeysound = "AIzaSyB2O4ThEf_uHBHsj7Fy8BCpMYZPZa0sHcw"
        var queryURLsound = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + artist + "+" + song + "&key=" + apiKeysound;

        $.ajax({
            url: queryURLsound,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var video = $("#video-info");
            video.attr('src', "https://www.youtube.com/embed/" + response.items[0].id.videoId);

        });

        var apiKeylyrics = "uEQ4LMmu0zqIhJMQINQ5Ork44T2IVrJa5jLwcP3IgRaRkfFD8B4YYh70QwUJlZyP"
        var queryURLlyrics = "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + song + "?apikey=" + apiKeylyrics;

        $.ajax({
            url: queryURLlyrics,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#lyrics-info").text(response.result.track.text);

            $("#artist-info").text(" " + artist);
            $("#song-info").text(" " + song);
         
        });

        $("#inputartist").val("");
        $("#inputsong").val("");

        database.ref().on("child_added", function (childSnapshot) {
            var artist = childSnapshot.val().Artist_Name;
            var song = childSnapshot.val().Song_Name;
        
            
            
            var newRow = $("<tr>").append(
                $("<td>").text(artist),
                $("<td>").text(song),
            );
        
            $("#table > tbody").append(newRow);
        
        });

    });

    $("#top-hits").on("click", function () {
        event.preventDefault();
        function results() {
            $("#home-page").hide();
            $("#results-page").show();
        }
        results();

        $("#video-info").attr('src', "");
        $("#song-info").text("");
        $("#lyrics-info").html("");

        

        var topArtistsPicked = ["Sam Smith & Normani", "Dean Lewis", "Kacey Musgraves", "Drake", "Ava Max", "Post Malone", "5 Seconds of Summer", "Lauren Daigle"];
        var topSongPicked = ["Dancing With A Stranger", "Be Alright", "Slow Burn", "Nonstop", "Sweet but Psycho" ,"Better Now", "Youngblood", "You Say"];

        var loopEnd = Math.floor(Math.random() * topArtistsPicked.length);
        console.log(loopEnd);
        var randomArtist = topArtistsPicked[loopEnd];
        var randomSong = topSongPicked[loopEnd]; 
       
        console.log(randomArtist);
        console.log(randomSong);

        var newSearch = {
            Artist_Name: randomArtist,
            Song_Name: randomSong
        };

        database.ref().push(newSearch);
        var randomA = randomArtist
        var randomS = randomSong



        var apiKeylyrics = "uEQ4LMmu0zqIhJMQINQ5Ork44T2IVrJa5jLwcP3IgRaRkfFD8B4YYh70QwUJlZyP"
        var queryURLlyrics = "https://orion.apiseeds.com/api/music/lyric/" + randomA + "/" + randomS + "?apikey=" + apiKeylyrics;

        $.ajax({
            url: queryURLlyrics,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#lyrics-info").text(response.result.track.text);
        });

        var apiKeysound2 = "AIzaSyB2O4ThEf_uHBHsj7Fy8BCpMYZPZa0sHcw"
        var queryURLsound2 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + randomA + "+" + randomS + "&key=" + apiKeysound2;

        $.ajax({
            url: queryURLsound2,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var video = $("#video-info");
            video.attr('src', "https://www.youtube.com/embed/" + response.items[0].id.videoId);
            //  video.attr({ width: '600px', height: '300px' });

            $("#artist-info").text(" " + randomA);
            $("#song-info").text(" " + randomS);

        });
        
        database.ref().on("child_added", function (childSnapshot) {
            // console.log(childSnapshot.val());
            var artist = childSnapshot.val().Artist_Name;
            var song = childSnapshot.val().Song_Name;
        
            // console.log(artist);
            // console.log(song);
            var newRow2 = $("<tr>").append(
                $("<td>").text(artist),
                $("<td>").text(song),
            );
        
            $("#table > tbody").append(newRow2);
        
        });
    });

    $("#home").on("click", function () {
        event.preventDefault();
        function goHome() {
            $("#home-page").show();
            $("#results-page").hide();
            location.reload(true);
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

});




