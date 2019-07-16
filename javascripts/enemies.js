class Enemy {
  constructor(ctx, gameScreenW, gameScreenH, difficulty) {
    this._ctx = ctx;

    this._gameScreenW = gameScreenW;
    this._gameScreenH = gameScreenH;

    this._difficulty = difficulty;

    this._posX = Math.floor(Math.random() * (this._gameScreenW - 5)) + 5; // enemies generated from all the width of the top of the screen
    this._posY = 0; // enemies appear from outside the screen

    this._velY = (Math.floor(Math.random() * (5 - 2)) + 2) * this._difficulty; // enemies' vertical velocity
    this._velX = Math.floor(Math.random() * (0.5 - -0.5)) + -0.5; // enemies' vertical velocity

    this._eRadius = (Math.floor(Math.random() * (10 - 4)) + 4) * this._difficulty; //  enemies' size

    this._enemW = this._eRadius * 2; //  enemie's width

    this._colorsArr = ["#F24C3D", "#73241D", "#B3382D", "#FF5040", "#D94436"];

    this._color = this._colorsArr[Math.floor(Math.random() * this._colorsArr.length)];
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = this._color;
    this._ctx.arc(this._posX, this._posY, this._eRadius, 0, 2 * Math.PI, true);
    this._ctx.fill();
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  move() {
    this._posY += this._velY;
    this._posX += this._velX;
  }
}
