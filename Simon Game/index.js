let userClickedPattern = [];
let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

// start game

$(document).keydown(() => {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    let color = nextSequence();
    playSound(color);
    fadeColor(color);
    started = true;
  }
});

// user actions

const userChoice = $(".btn").click((e) => {
  if (started) {
    let userColor = e.target.id;
    userClickedPattern.push(userColor);
    playSound(userColor);
    pressColor(userColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// check user answer

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
  } else {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        userClickedPattern = [];
        let color = nextSequence();
        playSound(color);
        fadeColor(color);
      }, 1000);
    }
  }
};

// computer actions

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let num = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[num];
  gamePattern.push(randomChosenColor);
  return randomChosenColor;
};

// helper functions

const playSound = (color) => {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
};

const fadeColor = (color) => {
  $(`#${color}`).fadeOut(100).fadeIn(100);
};

const pressColor = (color) => {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, 100);
};

const startOver = () => {
  started = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
};