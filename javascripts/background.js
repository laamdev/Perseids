class Background {
  // the constructor receives these properties from the game.js
  constructor(ctx, gameScreenW, gameScreenH) {
    this._ctx = ctx;
    this._width = gameScreenW;
    this._height = gameScreenH;

    this._posX = 0;
    this._posY = 0;
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  draw() {
    this._ctx.fillStyle = "#F2A444";
    this._ctx.fillRect(this._posX, this._posY, this._width, this._height);
  }
}
