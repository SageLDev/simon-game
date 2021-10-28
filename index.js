var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}


$(".btn").click(function() {
  if (isGameStarted === true) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if (isGameStarted === false) {
    isGameStarted = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("failure");
    gameOver();
  }
}

function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  var overSound = new Audio("sounds/wrong.mp3");
  overSound.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  level = 0;
  gamePattern = [];
  isGameStarted = false;
}
