const ScoreBoard = {
  ctx: undefined,

  init: function(ctx) {
    this.ctx = ctx;
    this.ctx.font = "20px Space Mono";
  },

  update: function(score) {
    this.ctx.fillStyle = "#03258C";
    this.ctx.fillText(Math.floor(score), 295, 680);
  }
};
