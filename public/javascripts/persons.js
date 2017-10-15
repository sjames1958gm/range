$(function() {

  $(".navli").removeClass("active");
  $(".nav-persons").addClass("active");

  console.log("persons");
  $(".editbtn").click(function(e) {
    console.log("click");
  });

  $(".add-new").click(function(e) {
    $(".add-form").toggleClass("hidden");
  });
});
