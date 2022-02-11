$(document).ready(function() {
  // --- our code goes here ---

  $("textarea").on('input', function() {
    
    const counter = 140 - this.value.length;
    $("output").text(counter);
    
    if (counter >= 50) {
      $("output").css('color', '');
    } else if (counter < 50) {
      $("output").css('color', 'Orange');
    } else if (counter < 0) {
      $("output").css('color', 'Red');
    }
  });

});
