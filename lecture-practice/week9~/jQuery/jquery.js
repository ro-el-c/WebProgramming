var imgArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

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
    if ($("#image").attr("src") == "img1.jpg") {
      $("#image").attr("src", "img2.jpg");
    } else {
      $("#image").attr("src", "img1.jpg");
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