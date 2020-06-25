function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.score = 0;
  this.targetScore = 5;
  this.level = 1;
  this.infisibl = false;

  this.snakeColor = [255, 255, 255]

  this.addScore = function (x) {
    for (one = 0; one < x; one++) {
      this.score++;
      // check if level up
      if (this.score === this.targetScore) {
        this.level++;
        this.targetScore = this.score * ((this.level + 1) ^ 0.1);
        framert = framert + 1;
        //frameRate(framert);
      }
    }
  }

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function () {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        this.score = 0;
        this.level = 1;
        framert = 5;
        //frameRate(framert);
        this.targetScore = 5
        this.snakeColor = [255, 255, 255];
        // stuur naar server
      }
    }
  }

  this.update = function () {
    if (this.total == this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function () {
    fill(this.snakeColor[0], this.snakeColor[1], this.snakeColor[2]);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }

  this.invsible = function () {
    if (this.infisibl == false) {
      this.snakeColor = [58, 58, 58];
      this.infisibl = true;
    } else {
      this.snakeColor = [255, 255, 255];
      this.infisibl = false;
    }
  }
}