(function(){
  "use strict";

  var pageNum, prev, next, chatButtons;
  var path = 'https://www.homestuck.com/story/';
  pageNum = parseInt((/\d+/).exec(window.location.pathname));
  if (!pageNum) {
    pageNum = 1;
  }
  prev = path + Math.max(1, pageNum - 1);
  next = path + (pageNum + 1);


  var navContainer = document.querySelector(".o_story-nav");
  var navLinks = navContainer.querySelectorAll("a");
  var navButton = navContainer.querySelector("button"); // Pages with an "3NT3R P4SSWORD" button instead of a link

  var nextPageElement; 
  if (navLinks) {
    nextPageElement = navLinks[navLinks.length - 1]; // Ignores [??????] links on retconned pages
  }
  else if (navButton) {
    nextPageElement = navButton; // Relevant on pages with a password input form instead of a link
  }
  else {
    nextPageElement = null;
  }

  // Forward navigation

  // Disables arrow key navigation on flash game pages, but allows "." navigation
  if (document.querySelector("embed")){   
    nextPage = function(usedArrowKey) {
      if (!usedArrowKey) {
        document.location = next;
      }
    };
  }
  // Moves to the next sequential page on Select Your Character pages instead of clicking the "skip to end" link
  else if (document.querySelector("canvas")) { 
    nextPage = function(usedArrowKey) {
      document.location = next;
    };
  }
  // Pages with no "next" link and no "3NT3R P4SSWORD" button to click, usually with the "next" link embeded somewhere else
  // This case should be synonymous with with the "flash game pages" case, but it is included for unforeseen exceptions
  else if (!nextPageElement){ //
    nextPage = function(usedArrowKey) {
      document.location = next; 
    };
  }
  // All other cases, typically a standard page or an "3NT3R P4SSWORD" page.
  // On a standard page, the "next" link is clicked. On an "3NT3R P4SSWORD" page, the "Submit" button is clicked
  else {
    nextPage = function(usedArrowKey) {
      nextPageElement.click();
    };
  }

  // Backward navigation

  // Disables arrow key navigation on flash game pages, but allows "," navigation
  if (document.querySelector("embed")){   
    prevPage = function(usedArrowKey) {
      if (!usedArrowKey) {
        document.location = prev;
      }
    };
  }
  // All other cases
  else {
    prevPage = function(usedArrowKey) {
      document.location = prev;
    };
  }

  // Opens chat logs  
  chatButtons = document.getElementsByClassName('o_chat-log-btn');
  function toggleLog(){
    if (chatButtons) {
      chatButtons[0].click();
    }
  };

  document.body.onkeydown = function(event){
    switch(event.keyCode){
    case 16:  // shift
    case 17:  // ctrl
    case 76: toggleLog(); break;  // l
    case 190: nextPage(false); break;  // .
    case 39: nextPage(true); break;  // right arrow
    case 188: prevPage(false); break;  // ,
    case 37: prevPage(true); break;  //left arrow
    }
  };
}());
