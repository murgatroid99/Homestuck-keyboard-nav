(function(){
  "use strict";

  var pageNum, prev, next, nextPage, prevPage, comicNum;
  if(!document.querySelector("embed")){
    pageNum = parseInt(/p=(\d+)/.exec(document.location.search)[1]);
    comicNum = parseInt(/s=(\d+)/.exec(document.location.search)[1]);
    prev = path + "?s=" + comicNum + "&p=" + pad6(pageNum - 1);
    next = path + "?s=" + comicNum + "&p=" + pad6(pageNum + 1);
    nextPage;
    prevPage = function(){
      document.location = prev;
    };
    var link = document.querySelector('font[size="5"] a');
    if(link){
      nextPage = function(){
        link.click();
      };
    } else {
      nextPage = function(){
        document.location = next;
      }
    }
  } else {
    prevPage = function(){};
    nextPage = function(){};
  }
  
  var buttons = document.getElementsByClassName('button');
  var showButton = buttons[0];
  var hideButton = buttons[1];
  function toggleSpoiler(){
    if(showButton.parentNode.style.display === "none"){
      hideButton.click();
    } else {
      showButton.click();
    }
  };

  document.body.onkeydown = function(event){
    switch(event.keyCode){
    case 17:
    case 76: toggleSpoiler(); break;
    case 39: nextPage(); break;
    case 37: prevPage(); break;
    }
  };
}());
