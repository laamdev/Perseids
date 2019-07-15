class Background {
  // the constructor receives these properties from the game.js
  constructor(ctx, canvasW, canvasH) {
    this._ctx = ctx;
    this._width = canvasW;
    this._height = canvasH;

    // this._image = new Image();
    // this._image.src = "images/bg.png";

    this._posX = 0;
    this._posY = 0;

    // this._velX = 0.5;
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  draw() {
    this._ctx.fillStyle = "#36C9C6";
    this._ctx.fillRect(this._posX, this._posY, this._width, this._height);
    // this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height);
    // this._ctx.drawImage(this._image, this._posX + this._width, this._posY, this._width, this._height);
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // move() {
  //   this._posX -= this._velX;
  //   if (this._posX <= -this._width) {
  //     this._posX = 0;
  //   }
  // }
}
