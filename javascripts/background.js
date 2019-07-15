class Background {
  // the constructor receives these properties from the game.js
  constructor(ctx, canvasW, canvasH) {
    this._ctx = ctx;
    this._width = canvasW;
    this._height = canvasH;

    this._posX = 0;
    this._posY = 0;
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  draw() {
    this._ctx.fillStyle = "#FF9F1C";
    this._ctx.fillRect(this._posX, this._posY, this._width, this._height);
  }
}
