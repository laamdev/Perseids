class Powerslow {
  constructor(ctx, gameScreenW, gameScreenH, difficulty) {
    this._ctx = ctx;

    this._gameScreenW = gameScreenW;
    this._gameScreenH = gameScreenH;

    this._difficulty = difficulty;

    this._posX = Math.floor(Math.random() * (400 - 200)) + 200; // powerups generated from all the width of the top of the screen
    this._posY = this._gameScreenH; // powerups appear from outside the screen

    this._velY = 1; // powerups' vertical velocity
    this._velX = Math.floor(Math.random() * (0.5 - -0.5)) + -0.5; // enemies' vertical velocity // powerups' vertical velocity

    this._psRadius = 10; //  enemies' size

    this._psW = this._psRadius * 2; //  enemie's width
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = "#F932C0";
    this._ctx.arc(this._posX, this._posY, this._psRadius, 0, 2 * Math.PI, true);
    this._ctx.fill();
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  move() {
    this._posY -= this._velY;
    this._posX += this._velX;
  }
}
