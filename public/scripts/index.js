// initialize important functions
function playerAnimation() {
  setTimeout(() => {
    $("#player-name").show();
  }, 400);
  setTimeout(() => {
    $("#current-trophies").show();
  }, 800);
  setTimeout(() => {
    $("#highest-trophies").show();
  }, 1200);
  setTimeout(() => {
    $("#peak").show();
  }, 1600);
  setTimeout(() => {
    $("img").show();
  }, 2000);
}

// script
playerAnimation();
