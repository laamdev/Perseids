class Enemy {
  constructor(ctx, canvasW, canvasH, score, difficulty) {
    this._ctx = ctx;

    this._gameW = canvasW;
    this._gameH = canvasH;

    this._gameScore = score;
    this._difficulty = difficulty;

    this._posX = Math.floor(Math.random() * (this._gameW - 5)) + 5; // enemies generated from all the width of the top of the screen
    this._posY = 0; // enemies appear from outside the screen

    this._velY = Math.floor(Math.random() * (5 - 2)) + 2; // enemies' vertical velocity

    this._eRadius = Math.floor(Math.random() * (10 - 5)) + 5; //  enemies' size

    this._enemW = this._eRadius * 2; //  enemie's width
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = "#E71D36";
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
