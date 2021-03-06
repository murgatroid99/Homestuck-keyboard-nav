(function(){
  "use strict";

  var pageNum, prev, next, chatButtons, nextPage, prevPage, navContainer, navLinks, navButton, nextPageElement;
  var path = 'https://www.homestuck.com/story/';
  pageNum = parseInt((/\d+/).exec(window.location.pathname));
  if (!pageNum) {
    pageNum = 1;
  }
  prev = path + Math.max(1, pageNum - 1);
  next = path + (pageNum + 1);


  navContainer = document.querySelector(".o_story-nav");
  if (navContainer) {
    navLinks = navContainer.querySelectorAll("a");
    navButton = navContainer.querySelector("button"); // Pages with an "enter password" button instead of a link
  }
 
  if (navLinks && navLinks.length > 0) {
    nextPageElement = navLinks[navLinks.length - 1]; // Ignores [??????] links
  }
  else if (navButton) {
    nextPageElement = navButton; // Relevant on pages with a password input form instead of a link
  }
  else {}

  // Forward navigation

  // Disables arrow key navigation on Flash (Alterniabound) and HTML5 (Openbound) game pages, but allows "." navigation
  if (document.querySelector("#o_flash-container") || document.querySelector("#JterniaDeploy")){   
    nextPage = function(usedArrowKey) {
      if (!usedArrowKey) {
        if (nextPageElement) {
          nextPageElement.click();
        }
        else {
          document.location = next;
        }
      }
    };
  }
  // Moves to the next sequential page on certain Select Your Character pages instead of clicking the "skip to end" link
  else if (document.querySelector("canvas")) { 
    nextPage = function(usedArrowKey) {
      document.location = next;
    };
  }
  // A standard page or an "enter password" page.
  // On a standard page, the "next" link is clicked. On an "enter password" page, the "Submit" button is clicked
  else if (nextPageElement){ //
    nextPage = function(usedArrowKey) {
      nextPageElement.click();
    };
  }
  // Pages with no "next" link and no "enter password" button to click, e.g. #4469
  else {
    nextPage = function(usedArrowKey) {
      document.location = next;
    };
  }

  // Backward navigation

  // Disables arrow key navigation on Flash (Alterniabound) and HTML5 (Openbound) game pages, but allows "," navigation
  if (document.querySelector("#o_flash-container") || document.querySelector("#JterniaDeploy")){   
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
    if (chatButtons && chatButtons.length > 0) {
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
