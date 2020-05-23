/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Securing user text from potential harm to site
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  // Function to calculate amount of time elapsed since refresh
  const howLongAgo = function (date) {
    if (date < 1000) {
      return Math.round(date) + " milliseconds ago";
    } else if (date >= 1000 && date < 60000) {
      return Math.round((date / 1000)) + " seconds ago";
    } else if (date >= 60000 && date < 3600000) {
      return Math.round((date / 60000)) + " minutes ago";
    } else if (date >= 3600000 && date < 86400000) {
      return Math.round((date / 3600000)) + " hours ago";
    } else if (date >= 86400000 && date < 604800000) {
      return Math.round((date / 86400000)) + " days ago";
    } else {
      return Math.round((date / 604800000)) + " weeks ago";
    }
  }

  const createTweetElement = function (tweets) {
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
      <p class="info" id="icons">
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
    // Loops through tweets, and adds the element to the top of the page
    for (let element of tweet) {
      $(".tweets-container").prepend(createTweetElement(element));
    }
  }
    // Loads all of the tweets from database
  const loadTweets = function () {
    $.get("/tweets", function (tweetObj) {
      renderTweets(tweetObj);
    })
  }
  loadTweets();

  $(function () {
    const $compose = $("#compose");
    $compose.on("click", function () {
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
      // if text is empty, or text is over limit, shows error message
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
      // AJAX post request
      let serial = $("textarea").serialize()
      $.post("/tweets", serial, function () {
        loadTweet();
      })
      // Empty out textarea value after submitting tweet
      $("#tweet-text").val("");
    })
    // renders last tweet, so that the page could refresh
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


