(function(){
  "use strict";
  
  var pageNum = parseInt(/p=(\d+)/.exec(document.location.search)[1]);
  var prev = "/index.php?s=6&p=00" + (pageNum - 1);
  var next = "/index.php?s=6&p=00" + (pageNum + 1);
  var nextPage;
  function prevPage(){
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
    case 76: toggleSpoiler(); break;
    case 39: nextPage(); break;
    case 37: prevPage(); break;
    }
  };
}());
