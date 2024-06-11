var imgArray = [
  "imgs/img1.jpg",
  "imgs/img2.jpg",
  "imgs/img3.jpg",
  "imgs/img4.jpg",
  "imgs/img5.jpg",
];

$(document).ready(function () {
  var i = 0;
  $("div.out")
    .mouseover(function () {
      $("p:first", this).text("mouse over");
      $("p:last", this).text(++i);
    })
    .mouseout(function () {
      //method chaining
      $("p:first", this).text("mouse out");
      //"p:first", this == div.out p:first
    });

  $("#b1").on(
    "click", // event handling with passing data
    {
      url: "https://www.google.com",
      winattributes: "resize=1, scrollbars=1, status=1",
    },
    maxopen
  );

  //-------------- on() & off()
  $("#bind").click(function () {
    $("body").on("click", "#theone", flash).find("#theone").text("Can Click!");
  });
  $("#unbind").click(function () {
    $("body")
      .off("click", "#theone", flash)
      .find("#theone")
      .text("Does nothing...");
  });

  //-------------- trigger()
  $("#trigger_test button:first").click(function () {
    update($("#trigger_test div:first span"));
  });
  $("#trigger_test button:last").click(function () {
    $("#trigger_test button:first").trigger("click");
    update($("#trigger_test div:last span"));
  });

  //-------------- attr(), 이미지 변경
  $("#image").click(function () {
    if ($("#image").attr("src") == "imgs/img1.jpg") {
      $("#image").attr("src", "imgs/img2.jpg");
    } else {
      $("#image").attr("src", "imgs/img1.jpg");
    }
  });

  //-------------- attr(), 사진 앨범
  var albumIdx = 0;
  $("#imgAlbum").attr("src", imgArray[albumIdx++]);
  $("#imgAlbum").click(function () {
    albumIdx = (albumIdx + 1) % imgArray.length;
    $("#imgAlbum").attr("src", imgArray[albumIdx]);
  });
  // $("#imgAlbum").attr("src", imgArray[albumIdx++]);
  // $("#imgAlbum").click(
  //   function () {
  //     $("#imgAlbum").attr("src", imgArray[albumIdx++]);
  //     if (albumIdx >= imgArray.length) {
  //       albumIdx = 0;
  //   }
  // });

  //-------------- CSS Style 수정
  var defaultFontSize = $(".main-menu").css("font-size");
  $(".main-menu").mouseover(function () {
    $(this).css({ "font-size": 20, background: "green" });
  });
  $(".main-menu").mouseout(function () {
    $(this).css({ "font-size": defaultFontSize, background: "none" });
  });

  //-------------- 실습 8 - 노트 추가
  $("#add_img img").on("click", show_note_form);
  $("#add_note").on("click", push_note);
  $(window).resize(function () {
    change_position($(".pop-up"));
  });

  //-------------- 실습 9 - animate()
  $("#moving_button").on("click", move_box);

  //-------------- 13 - jQuery 실습 - each()
  // $(".accordion").each(function () {
  //   var dl = $(this);
  //   var alldd = dl.find("dd");
  //   var alldt = dl.find("dt");
  //   alldd.hide();
  //   alldt.css({ cursor: "pointer" });

  //   alldt.on("click", function () {
  //     alldd.hide();
  //     $(this).next().show();
  //     alldt.css({ cursor: "pointer" });
  //     $(this).css({ cursor: "default" });
  //   });
  // });
  $(".accordion").each(function () {
    var dl = $(this);
    var allDt = dl.find("dt");
    var allDd = dl.find("dd");
    function closeAll() {
      allDd.addClass("closed");
      allDt.addClass("closed");
    }
    function open(dt, dd) {
      dt.removeClass("closed");
      dd.removeClass("closed");
    }

    closeAll();

    allDt.on("click", function () {
      closeAll();
      open($(this), $(this).next());
    });
  });

  //-------------- slideshow
  var interval = 3000;
  $(".slideshow").each(function () {
    var container = $(this);
    var timer;
    function switchImg() {
      var imgs = container.find("img");
      var first = imgs.eq(0); // 첫 번째 이미지
      var second = imgs.eq(1);

      first.appendTo(container).fadeOut(2000); // 마지막에 추가
      // 새로운 것이 아니라, 기존의 것을 뒤에 append하는 것이기 때문에 copy X
      // 맨 앞에서 지워지고 뒤에 추가됨
      second.fadeIn(2000);
    }

    function startTimer() {
      timer = setInterval(switchImg, interval);
    }
    function stopTimer() {
      clearInterval(timer);
    }
    //3초에 한 번 이미지 바뀜 / 마우스 hover일 때 멈춤
    startTimer();
    container.hover(stopTimer, startTimer);
    //hover(handler1, handler2);
    //handler1: 마우스가 위에 있을 때
    //handler2: 마우스가 위에 있다가 사라졌을 때
  });

  //-------------- 웹 서버 파일 불러오기
  $("#getText").click(function () {
    //$("#textbox").text("글자 입력 테스트");

    var tb = $("<table/>");
    var row = $("<tr/>").append(
      $("<th/>").text("이름"),
      $("<th/>").text("아이디"),
      $("<th/>").text("학과"),
      $("<th/>").text("수강 과목")
    );
    tb.append(row);

    //txt 파일을 json 형태로 불러오는 방법
    var req = $.ajax({
      url: "data.txt",
      dataType: "json",
    });
    req.done(function (data, status) {
      for (var i = 0; i < data.length; i++) {
        var student = data[i];

        var classes = student.class;
        var classStr = classes.join(", ");

        var row = $("<tr/>").append(
          $("<td/>").text(student.name),
          $("<td/>").text(student.id),
          $("<td/>").text(student.department),
          $("<td/>").text(classStr)
        );

        tb.append(row);

        //var str = "<br>" + data[i].name;
        //$("#textbox").append(str);
      }
    });

    $("#textbox").html(tb);
    /* txt, json 파일을 각각의 형태로 불러오는 방법
    var req = $.ajax("data.json");
    req.done(function (data, status) {
      //서버가 주는 data와 응답 상태 status
      //var students = JSON.parse(data); //txt file -> 응답이 문자열 형태 => JS object로 변환 (parse)
      
      //.json 파일을 불러오면 데이터 자체가 json 형식이므로 parse 필요 X
      for (var i = 0; i < data.length; i++) {
        var str = "<br>" + data[i].name;
        $("#textbox").append(str);
      }
    });*/
    
    /*
    node app.js로 웹 서버를 실행시키지 않고 jquery.html을 크롬에 드래그앤드랍했을 때,
    위 작업이 성공적으로 수행되지 않는 이유는?
    
    -> 드래그앤드랍 이후 주소창을 확인해 보면, 현재 파일의 경로가 출력됨
    => 그냥 js를 실행한 것과 같으며, 이는 브라우저가 실행시키는 것
        따라서, 실질적으로 웹서버로부터 데이터를 가져오는 동작이 정상적으로 수행되지 않음
    */
  });

  var req = $.ajax({
    url: "/rss",
    dataType: "xml",
  });
  //dataType을 명시하지 않으면 string
  //dataType을 명시하지 않은 경우, .done 에서 $.parseXML(data) 작업 거친 후 사용
  req.done(function (data) {
    var items = $(data).find("item");
    if (items.length > 0) {
      items = items.slice(0, 5);
      var uTag = $("<ul />");
      items.each(function () {
        var item = $(this);
        var lk = item.find("link").text();
        var title = item.find("title").text();

        var aTag = $("<a />")
          .attr({
            href: lk,
            target: "_blank",
          })
          .text(title);
        var liTag = $("<li />").append(aTag);
        //또는 $("<li />").html(aTag);

        uTag.append(liTag);
      });
      $("#news").html(uTag);
      //append 사용시 뒤에 덧붙이기 때문에 갱신되는 것이 아닌 내용 추가가 됨
    }
  });
  req.fail(function (jqXHR, textStatus) {
    alert("failed: " + textStatus);
  });
});

function maxopen(event) {
  var maxwindow = window.open(event.data.url, "", event.data.winattributes);
  maxwindow.moveTo(0, 0);
  maxwindow.resizeBy(screen.availWidth, screen.availHeight);
}

function flash() {
  $("#off_test").show().fadeOut("slow");
}

function update(j) {
  var n = parseInt(j.text(), 10);
  j.text(n + 1);
}

function show_note_form() {
  $("#note_form").addClass("pop-up"); //.css({ display: "block" })
  change_position($(".pop-up"));
  $("#note_form").slideDown("slow");
}
function push_note() {
  var noteTitle = $("#note_title").val();
  var noteDate = $("#note_date").val();
  var noteContent = $("#note_content").val();

  var str =
    "<p>" + noteTitle + "<br>" + noteDate + "<br>" + noteContent + "</p><br>";
  $("#note").append(str); //append: 기존 내용 유지, 뒤에 추가

  $("#note_form").fadeOut("slow"); //.css({ display: "none" })
}

function change_position(obj) {
  var top = ($(window).height() - obj.height()) / 2;
  var left = ($(window).width() - obj.width()) / 2;
  obj.css({ top: top, left: left });
}

function move_box() {
  $("#animation_test").animate({ height: "+=50px" });
  $("#moving_box").animate({
    right: "0px",
    height: "+=50px",
    width: "+=50px",
  });
}
