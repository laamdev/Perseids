const ScoreBoard = {
  ctx: undefined,

  init: function(ctx) {
    this.ctx = ctx;
    this.ctx.font = "20px roboto";
  },

  update: function(score) {
    this.ctx.fillStyle = "#FDFFFC";
    this.ctx.fillText(Math.floor(score), 10, 25);
  }
};
