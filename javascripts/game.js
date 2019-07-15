const Game = {
  ctx: undefined,
  canvas: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  cursor: undefined,
  score: undefined,
  difficulty: 0,
  enemies: [],

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  init: function() {
    //sets the canvas and the context
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    //set canvas dimensions
    this.width = 600;
    this.height = 700;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    //starts the game
    this.start();
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  start: function() {
    // resets the game's parameters
    this.reset();

    // sets gameloop
    this.interval = setInterval(() => {
      // counts frames
      this.framesCounter++;
      // refreshes frames
      if (this.framesCounter > 1000) this.framesCounter = 0;
      // associates frames with points
      if (this.framesCounter % 100 == 0) {
        if (this.player._yPosition >= 1 && this.player._yPosition <= 100) {
          this.score += 7; //Aumentamos la puntuación de la partida cada 100 frames dependiendo de la posicion Y del jugador.
        } else if (this.player._yPosition >= 101 && this.player._yPosition <= 200) {
          this.score += 6;
        } else if (this.player._yPosition >= 201 && this.player._yPosition <= 300) {
          this.score += 5;
        } else if (this.player._yPosition >= 301 && this.player._yPosition <= 400) {
          this.score += 4;
        } else if (this.player._yPosition >= 401 && this.player._yPosition <= 500) {
          this.score += 3;
        } else if (this.player._yPosition >= 501 && this.player._yPosition <= 600) {
          this.score += 2;
        } else {
          this.score++;
        }
      }

      ///////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////

      this.clear();
      this.drawAll();
      this.moveAll();
      this.harder();
      this.generateEnemies();
      this.clearEnemies();
      this.isCollision();
    }, 1000 / this.fps);
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height); // we pass this properties to background.js
    this.player = new Player(this.ctx, this.canvas, this.width, this.height);
    this.scoreboard = ScoreBoard;
    this.scoreboard.init(this.ctx);
    this.score = 0;
    this.enemies = [];
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  drawAll: function() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach(enem => enem.draw());
    this.drawScore();
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  moveAll: function() {
    // this.background.move();
    this.enemies.forEach(enem => enem.move());
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  harder: function() {
    if (this.score >= 50 && this.score < 100) {
      this.difficulty = 20;
    } else if (this.score >= 100 && this.score < 150) {
      this.difficulty = 10;
    } else if (this.score >= 150 && this.score < 200) {
      this.difficulty = 5;
    } else if (this.score >= 200 && this.score < 300) {
      this.difficulty = 2;
    } else {
      this.difficulty = 30;
    }
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  generateEnemies: function() {
    if (this.framesCounter % this.difficulty == 0) {
      //Generamos obstaculos cada x frames.
      console.log(this.enemies);
      this.enemies.push(new Enemy(this.ctx, this.canvas.width, this.canvas.height, this.score, this.difficulty)); //pusheamos nuevos obstaculos
    }

    // meter en el constructor el radius y la vely
    // variable el 50

    // if (this.score >= 50) {
    //   this.framesCounter % 20 == 0;
    //   this.enemies._velY = Math.floor(Math.random() * (6 - 3)) + 3;
    //   this.enemies._eRadius = Math.floor(Math.random() * (100 - 30)) + 30; //  rate of enemies
    //}
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  clearEnemies: function() {
    this.enemies.forEach((enem, idx) => {
      if (enem._posY >= this.canvas.height) {
        this.enemies.splice(idx, 1);
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  isCollision: function() {
    this.enemies.some(enem => {
      let xDistance = this.player._xPosition - enem._posX;
      let yDistance = this.player._yPosition - enem._posY;
      let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

      if (distance < this.player._radius + enem._eRadius) {
        this.gameOver();
      }
    });

    if (this.player._xPosition + this.player._radius > this.canvas.width) {
      this.gameOver();
    } else if (this.player._xPosition - this.player._radius < 0) {
      this.gameOver();
    } else if (this.player._yPosition + this.player._radius > this.canvas.height) {
      this.gameOver();
    } else if (this.player._yPosition - this.player._radius < 0) {
      this.gameOver();
    }
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  drawScore: function() {
    this.scoreboard.update(this.score);
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  gameOver: function() {
    //stops the game
    clearInterval(this.interval);
  }
};

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
