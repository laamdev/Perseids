const ScoreBoard = {
  ctx: undefined,

  init: function(ctx) {
    this.ctx = ctx;
    this.ctx.font = "20px Bungee";
  },

  update: function(score) {
    this.ctx.fillStyle = "#f2ebdc";
    this.ctx.fillText(Math.floor(score), 290, 680);
  }
};
