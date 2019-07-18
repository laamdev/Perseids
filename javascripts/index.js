window.onload = () => {
  document.getElementById("start-button").onclick = function() {
    document.body.style.background = "#F2EBDC";
    document.getElementById("logo").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    document.getElementById("main-theme").play();
    Game.init("canvas");
  };
};
