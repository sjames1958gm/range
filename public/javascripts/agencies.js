$(function() {

  $(".navli").removeClass("active");
  $(".nav-agencies").addClass("active");

  console.log("personnel");
  $(".editbtn").click(function(e) {
    console.log("click");
  });

  $(".add-new").click(function(e) {
    $(".add-form").toggleClass("hidden");
  });
});
