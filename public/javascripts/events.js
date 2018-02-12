$(function() {

  $(".navli").removeClass("active");
  $(".nav-events").addClass("active");

  $(".editbtn").click(function(e) {
    console.log("click");
  });

  $(".add-new").click(function(e) {
    $(".add-form").toggleClass("hidden");
  });
});
