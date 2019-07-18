const Game = {
  ctx: undefined,
  gameScreen: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  cursor: undefined,
  score: undefined,
  enemyRate: 0,
  difficulty: 0,
  vulnerable: true,
  enemies: [],
  powerups: [],
  powerslows: [],

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  init: function() {
    //sets the canvas and the context
    this.gameScreen = document.getElementById("gameScreen");
    this.ctx = this.gameScreen.getContext("2d");

    //set canvas dimensions
    this.width = 600;
    this.height = 700;

    this.gameScreen.width = this.width;
    this.gameScreen.height = this.height;

    this.hit = new Audio("sounds/hit.wav");
    this.hit.volume = 0.7;

    this.getPU = new Audio("sounds/getPU.wav");
    this.getPU.volume = 0.7;

    this.outPU = new Audio("sounds/outPU.wav");
    this.outPU.volume = 0.7;

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

      // Raises the score every 100 frames
      if (this.framesCounter % 100 == 0) {
        if (this.player._yPosition >= 1 && this.player._yPosition <= 100) {
          this.score += 7; //The score is higher if the player is closer to the top of the screen.
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
      this.generatePowerups();
      this.generatePowerslows();
      this.generateEnemies();
      this.isCollisionPowerup();
      this.isCollisionPowerSlow();
      this.isCollisionEnemy();
      this.clearPowerups();
      this.clearPowerslows();
      this.clearEnemies();
      this.upDifficulty();
    }, 1000 / this.fps);
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height); // we pass this properties to background.js
    this.player = new Player(this.ctx, this.gameScreen, this.width, this.height);
    this.scoreboard = ScoreBoard;
    this.scoreboard.init(this.ctx);
    this.score = 0;
    this.enemies = [];
    this.powerups = [];
    this.powerslows = [];
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  clear: function() {
    this.ctx.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height);
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  drawAll: function() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach(enem => enem.draw());
    this.powerups.forEach(powup => powup.draw());
    this.powerslows.forEach(powslow => powslow.draw());

    this.drawScore();
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  moveAll: function() {
    this.enemies.forEach(enem => enem.move());
    this.powerups.forEach(powup => powup.move());
    this.powerslows.forEach(powslow => powslow.move());
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  upDifficulty: function() {
    if (this.score >= 50 && this.score < 100) {
      this.enemyRate = 20;
      this.difficulty = 1.5;
    } else if (this.score >= 100 && this.score < 150) {
      this.enemyRate = 10;
      this.difficulty = 2;
    } else if (this.score >= 150 && this.score < 200) {
      this.enemyRate = 5;
      this.difficulty = 2.5;
    } else if (this.score >= 200 && this.score < 300) {
      this.enemyRate = 2;
      this.difficulty = 3;
    } else {
      this.enemyRate = 30;
      this.difficulty = 1;
    }
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  generateEnemies: function() {
    //Generates an obstacle every (enemyRate) frames
    if (this.framesCounter % this.enemyRate == 0) {
      this.enemies.push(new Enemy(this.ctx, this.gameScreen.width, this.gameScreen.height, this.difficulty)); //pusheamos nuevos enemies
    }
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  generatePowerups: function() {
    //Generates an obstacle every (enemyRate) frames
    if (this.framesCounter % 7000 == 0) {
      this.powerups.push(new Powerup(this.ctx, this.gameScreen.width, this.gameScreen.height, this.difficulty)); //pusheamos nuevos powerups
    }
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  generatePowerslows: function() {
    //Generates an obstacle every (enemyRate) frames
    if (this.framesCounter % 200 == 0) {
      this.powerslows.push(new Powerslow(this.ctx, this.gameScreen.width, this.gameScreen.height, this.difficulty)); //pusheamos
      console.log(this.powerslows);
    }
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  clearEnemies: function() {
    this.enemies.forEach((enem, idx) => {
      if (enem._posY >= this.gameScreen.height) {
        this.enemies.splice(idx, 1);
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  clearPowerups: function() {
    this.powerups.forEach((powup, idx) => {
      if (powup._posY <= 0) {
        this.powerups.splice(idx, 1);
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  clearPowerslows: function() {
    this.powerslows.forEach((powslow, idx) => {
      if (powslow._posY <= 0) {
        this.powerslows.splice(idx, 1);
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  isCollisionEnemy: function() {
    this.enemies.some(enem => {
      let xDistance = this.player._xPosition - enem._posX;
      let yDistance = this.player._yPosition - enem._posY;
      let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

      if (distance < this.player._radius + enem._eRadius && this.vulnerable) {
        console.log(this.vulnerable);
        this.hit.play();
        this.gameOver();
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  isCollisionPowerup: function() {
    this.powerups.some(powup => {
      let xDistance = this.player._xPosition - powup._posX;
      let yDistance = this.player._yPosition - powup._posY;
      let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

      if (distance <= this.player._radius + powup._puRadius && this.vulnerable) {
        this.powerups.pop();
        this.vulnerable = false;
        this.player._color = "#125945";
        this.getPU.play();
        document.getElementById("main-theme").playbackRate = 0.5;

        console.log(this.vulnerable);

        setTimeout(() => {
          this.vulnerable = true;
          this.player._color = "#3B74BF";
          this.outPU.play();
          document.getElementById("main-theme").playbackRate = 1;
        }, 6000);
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  isCollisionPowerSlow: function() {
    this.powerslows.some(powslow => {
      let xDistance = this.player._xPosition - powslow._posX;
      let yDistance = this.player._yPosition - powslow._posY;
      let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

      if (distance <= this.player._radius + powslow._psRadius) {
        this.powerslows.pop();
        this.player._color = "#F2ACB2";
        this.getPU.play();

        let copyEnemies = this.enemies.map(enem => {
          enem._eRadius == enem._eRadius * 0.5;
          return enem;
        });

        console.log(copyEnemies);

        this.enemies = copyEnemies;

        document.getElementById("main-theme").playbackRate = 0.5;

        setTimeout(() => {
          this.player._color = "#3B74BF";
          this.outPU.play();
          document.getElementById("main-theme").playbackRate = 1;
        }, 6000);
      }
    });
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
    document.getElementById("game-over").style.display = "block";
    document.getElementById("restart-button").style.visibility = "visible";
    document.getElementById("restart-button").style.display = "block";
    document.getElementById("main-theme").volume = 0.2;
    document.getElementById("main-theme").playbackRate = 1;

    this.restart();
  },

  restart: function() {
    document.getElementById("restart-button").onclick = () => {
      document.getElementById("game-over").style.display = "none";
      this.reset();
      this.start();
      document.getElementById("restart-button").style.visibility = "hidden";
      document.getElementById("main-theme").volume = 0.7;
    };
  }
};
