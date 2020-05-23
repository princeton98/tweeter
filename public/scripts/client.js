/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
<article>
<header class="user">
 <img attr>"https://i.imgur.com/73hZDYK.png" 
 <p>name: Newton </p> 
 <span> handle: "@SirIssac"</span>
</header>
 <section class="content">
   <p>text: "If I have seen further it is by standing on the shoulders of giants" </p>
 </section>
 <footer>
   
   <p> 1461116232227 </p>
   <ul class="icons"> 
     <li><i></li>
     <li><i></li>
     <li><i></li>
   </ul>
 <footer>
</article>
*/
// sections inner instead of article
//
$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  const howLongAgo = function (date) {
     if (date < 1000) {
       return Math.round(date) + " milliseconds ago";
     } else if (date >= 1000 && date < 60000) {
       return Math.round((date / 1000)) + "seconds ago";
     } else if (date >= 60000 && date < 3600000) {
       return Math.round((date / 60000)) + " minutes ago";
     } else if (date >= 3600000 && date < 86400000) {
       return Math.round((date / 3600000)) + " hours ago";
     } else if (date >= 86400000 && date < 604800000) {
       return Math.round((date / 86400000)) + " days ago";
     } else {
       return Math.round((date/604800000)) + " weeks ago";
     }
  }

  const createTweetElement = function (tweets) {
    //let date = new Date(tweets.created_at);
    //date = date.toLocaleTimeString();
    //date = date - Date.now();
    let date = (Date.now() - tweets.created_at)
    let timeElapsed = howLongAgo(date);
    const $tweet = $(`
  <article class="tweet">
    <header class="user">
    
    <p class="imageName">
    <img src= "${tweets.user.avatars}">
       &nbsp; &nbsp; ${tweets.user.name}
    </p>
      <div class="tag"> ${tweets.user.handle}</div>
    </header>
    <section class="content">
      <p class="tweet-body">${escape(tweets.content.text)}</p>
    </section>
    <footer class="bottom-bar">
      <p class="info">${timeElapsed}</p>
      <p class="info">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </p>
    </footer>
  </article>
`)
    return $tweet;
  }

  const renderTweets = function (tweet) {
    for (let element of tweet) {
      $(".tweets-container").prepend(createTweetElement(element));
    }
  }

  const loadTweets = function () {
    $.get("/tweets", function (tweetObj) {
      renderTweets(tweetObj);
    })
  }
  loadTweets();

  $(function () {
    const $compose = $("#compose");
    $compose.on("click", function () {
      //$("#popup").empty();
      if ($("#popup").first().is(":hidden")) {
        $("#popup").slideDown(500);
        $("#tweet-text").focus();
        event.preventDefault();
        
      } else {
        $("#popup").hide();
        $(".error").empty();
        event.preventDefault();
      }
    })
  })


  $(function () {
    const $button = $("#submit");
    $button.on("click", function () {
      $(".error").empty();
      event.preventDefault();

      const textLength = ($("textarea")[0].value.length);
      if (textLength === 0) {
        $(".error").prepend("Invalid Tweet");
        $(".error").slideDown(1000);
      return;
    } else if (textLength > 140) {
      $(".error").prepend("Message Too Long");
      $(".error").slideDown(1000);
      return;
    }
    let serial = $("textarea").serialize()
    $.post("/tweets", serial, function () {
      loadTweet();
    })
    $("#tweet-text").val("");
  })
  const loadTweet = () => {
    $.get("/tweets", function (tweetObj) {
      renderTweet(tweetObj[tweetObj.length - 1]);
    })
  }

  const renderTweet = function (tweet) {
    $(".tweets-container").prepend(createTweetElement(tweet));
  }
})
})


