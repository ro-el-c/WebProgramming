function calc() {
  var x = parseInt(document.getElementById("x").value);
  var y = parseInt(document.getElementById("y").value);
  var result = document.getElementById("sum");
  result.value = x + y;
}


function getRandomNum1to100 () {
  return Math.floor(Math.random() * 100 + 1);
}

var computerNumber = getRandomNum1to100();
var nGuesses = 0;

function guess() {
  nGuesses++;

  var userNum = parseInt(document.getElementById("user").value);
  var guessNum = document.getElementById("guesses");
  var hint = document.getElementById("result");

  guessNum.value = nGuesses;
  
  if (userNum == computerNumber) {
    hint.value = "정답입니다.";
  }
  else if (userNum < computerNumber) {
    hint.value = "낮습니다.";
  }
  else {
    hint.value = "높습니다.";
  }
}

function replay() {
  computerNumber = getRandomNum1to100();
  nGuesses = 0;
  document.getElementById("guesses").value = nGuesses;
  document.getElementById("result").value = "";
  document.getElementById("computer-num").value = computerNumber;
}