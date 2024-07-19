// initialize important functions
function playerAnimation() {
  setTimeout(() => {
    $("#player-name").show();
  }, 400);
  setTimeout(() => {
    $("#club-name").show();
  }, 800);
  setTimeout(() => {
    $("#current-trophies").show();
  }, 1200);
  setTimeout(() => {
    $("#highest-trophies").show();
  }, 1600);
  setTimeout(() => {
    $("#peak").show();
  }, 2000);
  setTimeout(() => {
    $("#peak-img").show();
  }, 2400);
}

// script
playerAnimation();
