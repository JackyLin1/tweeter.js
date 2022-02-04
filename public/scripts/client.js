/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {


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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const renderTweet = function (tweets) {
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(`.messages`).append($tweet);
  }
}

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

renderTweet(data);
});
