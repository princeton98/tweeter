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

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function (tweets) {
    let date = new Date(tweets.created_at);
    date = date.toLocaleString();
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
      <p class="info">${date}</p>
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
    const $button = $("#submit");
    $button.on("click", function () {
      $(".error").empty();

      const textLength = ($("textarea")[0].value.length);
      if (textLength === 0) {
        $(".error").prepend("Invalid Tweet");
        $(".error").slideDown("slow", function(){

        });
        event.preventDefault();
        return;
      } else if (textLength > 140) {
        $(".error").prepend("Message Too Long");
        $(".error").slideDown("slow", function(){
        });
        event.preventDefault();
        return;
      }
      event.preventDefault();
      let serial = $("textarea").serialize()
      $.post("/tweets", serial, function () {
        //console.log("hello");
        loadTweet();
      })
      $("#tweet-text").val("");
    })
    const loadTweet = () => {
      $.get("/tweets", function (tweetObj) {
        renderTweet(tweetObj[tweetObj.length-1]);
      })
    }

    const renderTweet = function (tweet) {
        $(".tweets-container").prepend(createTweetElement(tweet));
    }
  })
})


