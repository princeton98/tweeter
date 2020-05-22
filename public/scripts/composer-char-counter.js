$(document).ready(function() {
  $("textarea").on("keyup", function () {
    //console.log(this.value.length);
    //console.log(140 - this.value.length);
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

