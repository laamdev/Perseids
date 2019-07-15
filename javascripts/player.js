class Player {
  constructor(ctx, canvas, canvasW, canvasH) {
    this._ctx = ctx;
    this._canvas = canvas;

    // we pass the width and height of the game (canvas) to the player for reference
    this._gameW = canvasW;
    this._gameH = canvasH;

    // we declare the mouse X and Y position
    this._mouseX = 0;
    this._mouseY = 0;

    this._pX = 0;
    this._pY = 0;

    // we declare the player's X and Y position
    this._xPosition = canvasW / 2;
    this._yPosition = (canvasH / 2) * 1.5;

    // we declare the radius of the player
    this._radius = 10;

    // we declare the width and the height of the player
    this._pWidth = this._radius * 2;
    this._pHeight = this._radius * 2;

    // we call the listeners since the beggining
    this.setListeners();
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // we get the mouse X and Y positions and assign them to the player's X and Y positions
  setListeners() {
    this._canvas.onmousemove = e => {
      this._mouseX = e.offsetX;
      this._mouseY = e.offsetY;

      this._xPosition = this._mouseX;
      this._yPosition = this._mouseY;

      // transforms the cursor to a crosshair

      this._canvas.style.cursor = "crosshair";
    };
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // we give to the arc the x and y positions that equal the x and y coordinates of the mouse, so the player moves with the mouse

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = "#ED6A5A";
    this._ctx.arc(this._xPosition, this._yPosition, this._radius, 0, 2 * Math.PI, true);
    this._ctx.fill(); //Funcion que anima los frames.
  }
}
