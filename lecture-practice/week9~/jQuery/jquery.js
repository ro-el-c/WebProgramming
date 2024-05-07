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
    "click",
    {
      url: "https://www.google.com",
      winattributes: "resize=1, scrollbars=1, status=1",
    },
    maxopen
  );

  //--------------
  $("#bind").click(function () {
    $("body").on("click", "#theone", flash).find("#theone").text("Can Click!");
  });
  $("#unbind").click(function () {
    $("body")
      .off("click", "#theone", flash)
      .find("#theone")
      .text("Does nothing...");
  });
});

function maxopen(event) {
  var maxwindow = window.open(event.data.url, "", event.data.winattributes);
  maxwindow.moveTo(0, 0);
  maxwindow.resizeBy(screen.availWidth, screen.availHeight);
}
//-------------------
function flash() {
  $("#off_test").show().fadeOut("slow");
}
