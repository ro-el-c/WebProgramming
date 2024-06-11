/*
npm init
npm install express --save
npm install serve-static --save
node app.js
*/
var express = require("express"),
  http = require("http");
var static = require("serve-static");
var app = express(); //익스프레스 객체 생성
var router = express.Router();

//환경 세팅
app.set("port", process.env.PORT || 8080); //기본 포트를 app 객체에 속성으로 설정
app.set("host", "localhost"); //루프백 주소

//요청을 처리할 서버 미들웨어
app.use(static(__dirname)); //정적 접근 허용
//__dirname: node에서 제공하는 node 파일의 경로를 담고 있는 변수

// app.use(function (req, res, next) {
//   console.log("첫 번째 미들웨어에서 요청을 처리함.");

//   req.user = "mike";
//   next();
// });

// app.get("/", function (req, res, next) {
//   console.log("두 번째 미들웨어에서 요청을 처리함.");

//   res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
//   res.end("<h1>Express 서버에서 " + req.user + "가 응답한 결과입니다.</h1>");
// });

router.route("/").get(function (req, res) {
  res.redirect("http://localhost:8080/jquery.html");
});

router.route("/routetest").get(function (req, res) {
  res.redirect("http://www.google.com");
});

router.route("/rss").get(function (req, res) {
  console.log("rss data requested");
  var feed = "http://fs.jtbc.co.kr/RSS/sports.xml";
  http.get(feed, function (httpres) {
    var rss_res = "";
    httpres.on("data", function (chunk) {
      //B가 어떤 data를 보내면 data 전송이라는 이벤트 발생
      rss_res += chunk;
    });
    httpres.on("end", function () {
      //data 전송 종료 이벤트
      res.send(rss_res); //res: A가 A.html(자신의 웹 서버 안에 있는 html)에 보내는 응답
      console.log("rss response completed");
      res.end();
    });
  });
});

app.use("/", router);

http.createServer(app).listen(app.get("port"), app.get("host"), () => {
  //Express 서버 시작
  console.log(
    "Express server running at " + app.get("port") + " " + app.get("host")
  );
});

//app.js에 수정이 있을 때만 서버 재실행
//jquery.js만 수정된 경우 재실행하지 않아도 됨
