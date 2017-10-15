$(function() {

  $(".navli").removeClass("active");
  $(".nav-events").addClass("active");

  $(".editbtn").click(function(e) {
    console.log("click");
  });

  $(".add-new").click(function(e) {
    if ($(".add-form").hasClass("hidden")) {
      $(".addshooterselect").empty();
      $.getJSON("/range/api/persons")
        .done((persons) => {
          $.each(persons, function(i, person) {
            $(".addshooterselect").append(`<option value=${person.id}>${person.name}</option>`);
          })
        })
    }
    $(".add-form").toggleClass("hidden");
  });

});
