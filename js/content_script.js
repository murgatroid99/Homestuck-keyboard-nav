(function(){
  "use strict";

  var pageNum, prev, next, chatButtons;
  var path = 'https://www.homestuck.com/story/';
  pageNum = parseInt((/\d+/).exec(window.location.pathname));
  if (!pageNum) {
    pageNum = 1;
  }
  prev = path + Math.max(1, pageNum - 1);

  var navContainer = document.querySelector(".o_story-nav");
  var navLinks = navContainer.querySelectorAll("a");
  var nextPageLink = navLinks[navLinks.length - 1]; // Deals with pages with a "[???????]" link before the next page link

  function nextPage(usedArrowKey){
    if (!(usedArrowKey && document.querySelector("embed"))){ //disables arrow key navigation on flash pages
	if (nextPageLink){
	    nextPageLink.click();
	}
    }
  };
  function prevPage(usedArrowKey){
    if (!(usedArrowKey && document.querySelector("embed"))){ //disables arrow key navigation on flash pages
      document.location = prev;
    }
  };
 
  
  chatButtons = document.getElementsByClassName('o_chat-log-btn');
  function toggleLog(){
      chatButtons[0].click();
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
