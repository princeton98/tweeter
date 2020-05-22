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
  const createTweetElement = function (tweets) {
    //create article, surround the whole thing around article
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
      <p class="tweet-body">${tweets.content.text}</p>
    </section>
    <footer class="bottom-bar">
      <p class="info">${tweets.created_at}</p>
      <p class="info">pictures</p>
    </footer>
  </article>
`)
    return $tweet;
  }

  const renderTweets = function (tweet) {
    //loops through tweets
    // calls createTweetElement for each tweet
    // tkaes return value and appends it to the tweets container
    for (let element of tweet) {
      //let value = createTweetElement(tweet)
      // console.log(element);
      $(".tweets-container").append(createTweetElement(element));
    }
  }

  const loadTweets = function () {
    // Ajax get request
    // from /tweets route
    $.get("/tweets", function (tweetObj) {
      //console.log("success" + tweetObj);
      renderTweets(tweetObj);
    })
  }
  loadTweets();

  $(function () {
    const $button = $("#submit");
    $button.on("click", function () {

      const textLength = ($("textarea")[0].value.length);
      if (textLength === 0) {
        alert("Invalid Tweet");
        event.preventDefault();
        return;
      } else if (textLength > 140) {
        alert("Message too Long");
        event.preventDefault();
        return;
      }
      event.preventDefault();
      let serial = $("textarea").serialize()
      $.post("/tweets", serial, function () {
        console.log("hello");
        // clearTweets();
        // loadTweets();
        loadTweet();
        //$.get("/", function (){
       // });
      })
    })
    const loadTweet = () => {
      $.get("/tweets", function (tweetObj) {
        renderTweet(tweetObj[tweetObj.length-1]);
      })
    }

    const renderTweet = function (tweet) {
        $(".tweets-container").append(createTweetElement(tweet));
    }
  })

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  // create AJAX post, sends form data to the server
  // handle the submit event 

  //const $tweet = createTweetElement(tweetData);
  //console.log($tweet);
  //$(".tweets-container").append($tweet);
  //renderTweets(data);
})


