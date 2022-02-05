/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {


  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

//messages goes through createTweetElement
//new tweets shows on top of old tweets
const renderTweet = function (tweets) {
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(`.messages`).prepend($tweet);
  }
}

//Tweet get form into a tweet card
const createTweetElement = function (data) {

  let $tweet = $(
    `<section class='box'>
    <top>
      <img class='profile' src=${data.user.avatars}>
      <div class='tweet'>${data.content.text}<hr></div>
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
  )
  return $tweet;
}


//.submit function takes in handler function with arg of eventObj
//added preventDefault to stop sending post request and reloading the page.
//use .serialize to turn form data into query string
//check for errors before sumbitting text
//runs loadTweets if successful to update tweets w/o refreshing
//if loadTweets works, clears textarea
$('form').submit(eventObj => {
  eventObj.preventDefault();
  const text = $("textarea").serialize();
  if($('textarea').val('')) {
    alert ('Nothing to share?');
  } else if (text.length > 140) {
    alert(`Too long, try something shorter`);
  } else {

    $.ajax ({
      url: `/tweets`,
      method: `POST`,
      data: text,
    })
    // .then(console.log(text))
    .then(loadTweets())
    .then($('textarea').val(''));
  }
})

//Get JSON in /tweets
//if successful, renderTweet();
function loadTweets () {
  $.ajax ({
    url:`/tweets`,
    method: `GET`,
  })
  .then ((tweets) => {
    renderTweet(tweets);
  })
}
loadTweets();
});
