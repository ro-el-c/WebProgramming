/*
npm init
npm install express --save
npm install serve-static --save
node app.js
*/
var express = require('express'), http = require('http');
var static = require('serve-static');
var app = express();

//환경 세팅
app.set('port', process.env.PORT || 8080);
app.set('host', 'ip_address'); //루프백 주소

//요청을 처리할 서버 미들웨어
app.use(static(__dirname)); //정적 접근 허용
//__dirname: node에서 제공하는 node 파일의 경로를 담고 있는 변수
http.createServer(app).listen(app.get('port'), app.get('host'), () => {
	console.log("Express server running at " + app.get('port') + app.get('host'));
});