class Enemy {
  constructor(ctx, canvasW, canvasH) {
    this._ctx = ctx;

    this._gameW = canvasW;
    this._gameH = canvasH;

    this._eX = 0;
    this._eY = 0;

    this._posX = Math.floor(Math.random() * (this._gameW - 5)) + 5; // enemies appear from all the width of the x axis
    this._posY = 0; // enemies appear from outside the screen

    this._velY = 2; // enemies vertical velocity

    this._eRadius = Math.floor(Math.random() * (15 - 5)) + 5; //  rate of enemies
    this._enemW = this._eRadius * 2;
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = "black";
    this._ctx.arc(this._posX, this._posY, this._eRadius, 0, 2 * Math.PI, true);
    this._ctx.fill(); //Funcion que anima los frames.
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  move() {
    this._posY += this._velY;
  }
}
