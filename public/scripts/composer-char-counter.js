$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on('input', function() {
    
    let counter = 140 - this.value.length;
    $("output").text(counter);

    if (counter >= 50) {
      $("output").css('color', '');
    } if (counter < 50) {
      $("output").css('color', 'Orange');
    } if (counter < 0) {
      $("output").css('color', 'Red');
    }
  });
});
