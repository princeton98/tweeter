$(document).ready(function() {
  $("textarea").on("keyup", function () {
    let newCounter = 140 - this.value.length;
    const search = $(this).closest("form").find(".counter");
     search.val(newCounter);
      if (newCounter < 0) {
        $(search).attr("id","redCounter");
      } 
      else {
        $(search).removeAttr("id")
      }   
  });
})

