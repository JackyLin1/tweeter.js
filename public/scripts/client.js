/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //messages goes through createTweetElement
  //new tweets shows on top of old tweets
  const renderTweet = function(tweets) {
    $('.messages').empty();
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $(`.messages`).prepend($tweet);
    }
  };

  //escape function to re-encode text
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Tweet get form into a tweet card
  const createTweetElement = function(data) {
    let tweetContent = `<div class='tweet'>${escape(data.content.text)}<hr></div>`;

    let $tweet = $(
      `<section class='box'>
    <top>
      <img class='profile' src=${data.user.avatars}>
      ${tweetContent}
    </top>
    
    <p class='name'>${data.user.name}</name></p>
    <p class='userID'>${data.user.handle}</p>
    <footer>
    <p class= 'timestamp'>posted ${timeago.format(data.created_at)}</p>
    <p class='symbols'> 
      <span class ='thumbs'><i class="far fa-thumbs-up"></i></span>
      <span class ='retweet'><i class="fas fa-recycle"> </i> </span>
      <span class ='comment'><i class="far fa-comments"></i> </span> </p>     
    </footer>

  </section>`
    );
    return $tweet;
  };


  //.submit function takes in handler function with arg of eventObj
  //added preventDefault to stop sending post request and reloading the page.
  //use .serialize to turn form data into query string
  //check for errors before sumbitting text
  //runs loadTweets if successful to update tweets w/o refreshing
  //if loadTweets works, clears textarea
  //possible bug tweet doesnt get updated when text is too long, have to reclick submit.
  $('form').submit(eventObj => {
    eventObj.preventDefault();
    counter = 140;
    const text = $("textarea").serialize();
    if (!$('textarea').val()) {
    // alert ('Nothing to share?');
      $('#errShort').toggle(200);
    } else if (text.length > 140) {
    // alert(`Too long, try something shorter`);
      $('#errLong').toggle(200);
    } else {

      $.ajax({
        url: `/tweets`,
        method: `POST`,
        data: text,
      })
      // .then(console.log(text))
        .then(loadTweets())
        .then($('#errShort').hide())
        .then($('#errLong').hide())
        .then($('textarea').val(''))
        .then($('output').text('140'));
    }
  });

  //compose button function, click to show text
  $('#composeBtn').click(function() {
    $('#tweetarea').slideToggle('slow');
  });

  //Get JSON in /tweets
  //if successful, renderTweet();
  function loadTweets() {

    $.ajax({
      url:`/tweets`,
      method: `GET`,
    })
      .then((tweets) => {
        renderTweet(tweets);
      });
  }
  loadTweets();
});
