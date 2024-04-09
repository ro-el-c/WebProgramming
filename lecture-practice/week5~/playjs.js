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
  if (guesses.indexOf(letter) >= 0) {
    return;
  }
  else {
    guesses += letter;
    if (word.indexOf(letter) < 0) {
      guessCount--;
      console.log(guessCount);
    }
  }

  updatePage();
}

function newGame() {
  //변수 초기화 및 게임 단어 랜덤 할당
  randomNum = Math.floor(Math.random() * (POSSIVLE_WORDS.length-1));
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
  var clue = document.getElementById("clue");

  var underbar = "_ ";
  var clueStr = underbar.repeat(word.length);
  clue.innerHTML = clueStr.trim();

  var guessArea = document.getElementById("guessstr");
  guessArea.innerHTML = "Guesses: " + guesses;

  var image = document.getElementById("hangmanpic");
  image.src = `./hangman/hangman${guessCount}.gif`;

  /**
   * 
  *– hangman 이미지 갱신
  *– word에 대한 clue 문자열 갱신 후 출력
      ▪ guess 문자열과 word 문자열을 비교하여 clue 문자열 생성
      – html 문서의 <div id=“clue”> 영역
      – 최초 호출 시, word의 길이만큼 ‘_ ‘ 문자 출력
      – 추 후, 사용자 입력에 따라서 clue 문자열 갱신
  *– guess 문자열 출력
  *– 게임 승판 결정
   */
}