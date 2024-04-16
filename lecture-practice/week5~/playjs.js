window.onload = setCTime;
/* event handler; 동작, 즉 함수 자체가 와야 함;
!!! 따라서, 뒤에 괄호가 있으면 안 됨 !!! */

function calc() {
  var x = parseInt(document.getElementById("x").value);
  var y = parseInt(document.getElementById("y").value);
  var result = document.getElementById("sum");
  result.value = x + y;
}

function getRandomNum1to100() {
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
  } else if (userNum < computerNumber) {
    hint.value = "낮습니다.";
  } else {
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

function setCTime() {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var now = new Date();
  var data =
    months[now.getMonth()] +
    " " +
    now.getDate() +
    ", " +
    now.getHours() +
    " : " +
    now.getMinutes() +
    " : " +
    String(now.getSeconds()).padStart(2, "0");

  document.getElementById("ctime").innerHTML = data;
  setTimeout(
    setCTime,
    1000
  ); /* 한 번 실행하는 타이머 funtion(만료 뒤 실행할 함수) */
}

function changeimage() {
  var img = document.getElementById("cat-image");
  var arr = img.src.split("/");
  fileStr = arr[arr.length - 1];

  if (fileStr == "cat.png") {
    img.src = "./images/cat2.jpg";
  } else {
    img.src = "./images/cat.png";
  }
}

var colorNames = [
  "maroon",
  "red",
  "orange",
  "yellow",
  "olive",
  "purple",
  "fuchsia",
  "white",
  "lime",
  "green",
  "navy",
  "blue",
  "aqua",
  "teal",
  "black",
  "silver",
  "gray",
];

function createColorTable() {
  var colorTable = document.getElementById("colorTable");

  for (var i = 0; i < colorNames.length; i++) {
    var ctbox = document.createElement("div");
    ctbox.setAttribute("class", "ctbox");
    // ctbox.className = "ctbox";
    ctbox.style.display = "inline-block";
    ctbox.style.width = "60px";
    ctbox.style.padding = "10px";
    ctbox.style.backgroundColor = colorNames[i];
    ctbox.innerHTML = colorNames[i];
    colorTable.appendChild(ctbox);
  }
  //forEach 사용 가능
  // colorNames.forEach(colorName => {
  //   var ctbox = document.createElement("div");
  //   ctbox.className = "ctbox";
  //   ctbox.style.display = "inline-block";
  //   ctbox.style.width = "60px";
  //   ctbox.style.padding = "10px";
  //   ctbox.style.backgroundColor = colorName;
  //   ctbox.innerText = colorName;
  //   colorTable.appendChild(ctbox);
  // })
}

function removeColorTable() {
  var colorTable = document.getElementById("colorTable");
  // colorTable.innerHTML = "";

  // var child = colorTable.getElementsByTagName("div");
  // var child = colorTable.getElementsByClassName("ctbox");
  var child = colorTable.childNodes; //DOM 모델의 속성 값으로 가져오기
  //1
  // for (var i = child.length - 1; i >= 0; i--) {
  //   colorTable.removeChild(child[i]);
  // }
  //2
  // while (child[0]) {
  //   colorTable.removeChild(child[0]);
  // }
  //3
  while (colorTable.hasChildNodes) {
    colorTable.removeChild(colorTable.firstChild);
  }
}

/* Hangman */
//constans
var POSSIVLE_WORDS = [
  "obdurate",
  "verisimilitude",
  "defenestrate",
  "obsequious",
  "dissonant",
  "today",
  "idempotent",
];
var MAX_GUESSES = 6;

//global variables
var guesses = ""; //사용자가 추측한 문자들의 문자열
var guessCount = MAX_GUESSES; //남아있는 추측 횟수 (최대: 6번) - 틀렸을 때(사용자가 입력한 글자가 word에 없을 때) 감소
var word; //현재 게임에서 선택된 단어

function guessLetter() {
  //사용자 입력에 대한 결과 판단
  var letter = document.getElementById("hguess").value;
  var clue = document.getElementById("clue").innerHTML;

  if (
    guessCount == 0 ||
    clue.indexOf("_") < 0 ||
    guesses.indexOf(letter) >= 0
  ) {
    return;
  }

  guesses += letter;
  if (word.indexOf(letter) < 0) {
    guessCount--;
    console.log(guessCount);
  }

  updatePage();
}

function newGame() {
  //변수 초기화 및 게임 단어 랜덤 할당
  randomNum = Math.floor(Math.random() * (POSSIVLE_WORDS.length - 1));
  word = POSSIVLE_WORDS[randomNum];
  console.log(randomNum, word);
  guesses = "";
  guessCount = MAX_GUESSES;

  //guessbutton 활성화
  var guessBtn = document.getElementById("guessbutton");
  guessBtn.disabled = false;

  //updatePage 함수 호출
  updatePage();
}

function updatePage() {
  //hangman 이미지 갱신
  var hangmanpic = document.getElementById("hangmanpic");
  document.src = `./hangman/hangman${guessCount}.gif`;

  //clue 문자열 갱신
  var clueStr = "";
  for (var i = 0; i < word.length; i++) {
    var letter = word.charAt(i);
    if (guesses.indexOf(letter) >= 0) {
      clueStr += letter + " ";
    } else {
      clueStr += "_ ";
    }
  }
  var clue = document.getElementById("clue");
  clue.innerHTML = clueStr.trimEnd();

  var guessArea = document.getElementById("guessstr");

  var image = document.getElementById("hangmanpic");
  image.src = `./hangman/hangman${guessCount}.gif`;

  if (guessCount == 0) {
    guessArea.innerHTML = "you lose";
  } else if (guessCount > 0 && clueStr.indexOf("_") < 0) {
    guessArea.innerHTML = "you win";
  } else {
    guessArea.innerHTML = "Guesses: " + guesses;
  }
}
