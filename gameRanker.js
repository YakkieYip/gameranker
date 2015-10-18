var gg = {};

gg.apiKey = "zqp0BdLJMVmshRvkicqJp6qHcuCUp129tLKjsnkpHLL9M5iC99";
gg.rankedGamesArray = []; //should this be a global variable?
gg.origGames = [];

//Question 1: Do they have a PC or a game console?
gg.addPlatformListener = function(){
  $(".platformButton").on("click", gg.getPlatform);
};

gg.getPlatform = function(e){
    e.preventDefault();
    var userSelect = $("#platform").val(); //create a variable that stores the value of the user's selection
    gg.getRanking(userSelect); //call the getGames function with the value of userSelect
    // console.log(userSelect)
  };


// // Create a method for grabbing highly rated games from Metacritic using userSelect -->platformInput as their platform choice and pass (as an argument/paramter) through gg.getGames's function.
gg.getRanking = function(platformInput){
  $.ajax({
      url: "https://metacritic-2.p.mashape.com/game-list/" + platformInput + "/new-releases",
      method: "GET",
      dataType: "json",
      data: {
        order_by: "metascore" //highly rated games
      },
      headers: {
        "X-Mashape-Key": "zqp0BdLJMVmshRvkicqJp6qHcuCUp129tLKjsnkpHLL9M5iC99",
        "Accept": "application/json"
      }
  }).then(function(res){ //all the new releases
    // need to pass in arguments inside the function
    // console.log(res);
      gg.origGames = res.results; //store the games you get back into a variable (NOTE: .results is an array)
                            //for each item in the array, // index number, value of array item
      console.log("I got it!");
      // debugger;
      $(".rankingButton").off("click"); //erased what it used to be set at, remove all click handlers
      $(".rankingButton").on("click", function(e){
        console.log("clicked!");
        e.preventDefault();
        var userScore = $("#ranking").val();
        gg.filterGames(userScore);
      });
    });
  }; //end of fucntion
  gg.filterGames = function(lowerBoundString) {
    var lowerBound = parseInt(lowerBoundString);
    console.log("LowerBound: " + (lowerBound + 1));
    gg.rankedGamesArray = [];
    $.each(gg.origGames, function(index, object) { //object is the object from the array
      if ( (object.score >= lowerBound) && (object.score < (lowerBound + 10)) ) { 
        gg.rankedGamesArray.push(object); //if the game/object has a score higher than 80 add it to gg.rankedGamesArray

        console.log("Object Score: " + object.score + ", and the title is: " + object.name);
        // debugger;
        // console.log(object.name); //the object's name
      };
    });
    console.log(gg.rankedGamesArray);//a new array of objects!
    gg.displayInfo(gg.rankedGamesArray);
};

gg.displayInfo = function(games){
  $("#gameInfo").empty( );
  $.each(games, function(index, value){
    console.log("DisplayInfo: " + value);
    var $title = $("<h3>").text(value.name);
    var $image = $("<img>").attr("src", value.thumbnail);
    var $score = $("<p>").text("Score: " + value.score);
    var $date = $("<p>").text("Release Date: " + value.rlsdate);
    var $link = $("<a>").attr("src", value.url);
    var $gameContainer = $("<div>").addClass("tile").append($title, $image, $score, $date, $link);
    $("#gameInfo").append($gameContainer);
  });
};

gg.init = function() {
  gg.addPlatformListener();
  // gg.displayInfo();
};

// When the document is ready, initialize the Game Gifter app.
$(function() {
  gg.init();
});