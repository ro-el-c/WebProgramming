var context;
var velocity;
var angle;
var ballV;
var ballVx; //x방향 속도
var ballVy; //y방향 속도
var ballX = 10; //x방향 위치
var ballY = 250; //y방향 위치
var ballRadius = 10; //볼 크기
var score = 0;
var image = new Image(); //JS 제공 Image 클래스
image.src = "lawn.png";
var backimage = new Image();
backimage.src = "net.png";
var timer; //setInterval() 이용 - net에 맞거나 바깥에 떨어질 때 clearInterval()

//초기화
function init() {
  ballX = 10;
  ballY = 250;
  ballRadius = 10;
  context = document.getElementById('canvas').getContext('2d');
  draw();
}

//사용자가 발사 버튼을 누른 경우
function start() {
  init();
  velocity = Number(document.getElementById('velocity').value);
  angle = Number(document.getElementById('angle').value);

  var angleR = angle * Math.PI / 180; //사용자가 입력한 각도를 radian 값으로 변환
  ballVx = velocity * Math.cos(angleR);
  ballVy = -velocity * Math.sin(angleR); //위로 올라가는 것 = 좌표상 숫자가 줄어듦

  draw();
  timer = setInterval(calculate, 100);
  return false;
}

//전체 화면 그리기
function draw() {
  context.clearRect(0, 0, 500, 300); //화면 지우기
  drawBall();
  drawBackground();
}

//공 그리기
function drawBall() {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, 2.0 * Math.PI, true);
  context.fillStyle = "red";
  context.fill();
}

//배경 그리기
function drawBackground() {
  //drawImage(image, dx, dy)
  context.drawImage(image, 0, 270); //잔디
  context.drawImage(backimage, 450, 60); //그물
}

//공의 현재 속도, 위치 업데이트
function calculate() {
  ballVy = ballVy + 1.98; //중력 가속도 고려

  ballX += ballVx;
  ballY += ballVy;

  //목표물(그물)에 맞은 경우
  if ((ballX >= 450) && (ballX <= 480) && (ballY >=60) && (ballY <= 210)) {
    score++;
    document.getElementById('score').innerHTML = "점수 = " + score;
    clearInterval(timer);
  }

  //경계를 벗어난 경우
  if (ballY >= 300 || ballY < 0) {
    clearInterval(timer);
  }

  draw();
}

/*
속도가 빠른 경우, 공이 그물에 닿아도 점수가 오르지 않는 문제 있음
-> 속도 * cos 값으로 공이 이동할 때 그물을 통과해서 그 위치가 잡히지 않는 것 같음
*/