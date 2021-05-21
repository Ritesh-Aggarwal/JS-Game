var btns = ["b","c","e","f","d"];
var gamepattern = [];
var userpattern = [];
var level = 0;
var started = false;
var game = true;
var sound = true;

$("#check").change(function () { 
  if(this.checked == true){
    sound = true;
    console.log("sound on");
    $("#icon").html('<img src="assets/sound-on.png"></img>');
  }
  else if(this.checked == false){
    sound = false;
    console.log("sound off");
    $("#icon").html('<img src="assets/volume-off.png"></img>');
  }
  
});

$("#game").change(function () { 
  if(this.checked == true){
    game = false;
    console.log("game on");
    $("h1").text("Free play");
  }
  else if(this.checked == false){
    game = true;
    console.log("game off");
    gamepattern = [];
    $("h1").text("Press any key to start!");
  }
  
});

function playSound(p) {
    if(sound == true){
        var ad = new Audio("assets/"+ p +".mp3");
        ad.play();
    }
}

function btnpressed(key){
    $("#" + key).addClass("pressed");
    setTimeout(function(){ $("#" + key).removeClass("pressed"); }, 200);
}

function handler(event) {
    if(event.type == "click"){
        var k = event.currentTarget.firstChild.data;
        k = k.toLowerCase();
    }
    else if (event.type == "keypress")
        var k = event.key;
    userpattern.push(k);
    //console.log(k);
}

$(".ctrl").click(handler);
$(document).keypress(handler);


function nextSequence(){
    userpattern = [];
    var randomNumber = Math.floor(Math.random()*5);
    gamepattern.push(btns[randomNumber]);
    $("#" + btns[randomNumber]).fadeOut(200).fadeIn(200);
    playSound(btns[randomNumber]);
    console.log(gamepattern);
    level++;
    $("h1").text("Level " + level);
}

function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userpattern[currentLevel]) {
      if (userpattern.length === gamepattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else {
      playSound("wrong");
      $("h1").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("h1").fadeOut(100).fadeIn(100).fadeOut(200).fadeIn(100);
        $("h1").removeClass("game-over");
      }, 200);

      startOver();
    }
}

$(".ctrl").click(function (e){
    var k = e.currentTarget.firstChild.data;
    k = k.toLowerCase();
    if (started == false && game == true) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
        btnpressed(k);
        return;
      }
    playSound(k);
    btnpressed(k);
    if(game == true)
      checkAnswer(userpattern.length - 1);
});

$(document).keypress(function(event) {
    if(game==true){
      if (started == false) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
      btnpressed(event.key);
      return;
    }
    checkAnswer(userpattern.length - 1);
  }
    playSound(event.key);
    btnpressed(event.key);
  });

function startOver() {
    level = 0;
    gamepattern = [];
    started = false;
  }
