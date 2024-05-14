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
  $("#note_form").show(); //.css({ display: "block" })
}
function push_note() {
  var noteTitle = $("#note_title").val();
  var noteDate = $("#note_date").val();
  var noteContent = $("#note_content").val();

  var str = "<p>" + noteTitle + "<br>" + noteDate + "<br>" + noteContent + "</p><br>";
  $("#note").append(str); //append: 기존 내용 유지, 뒤에 추가

  $("#note_form").hide(); //.css({ display: "none" })
}