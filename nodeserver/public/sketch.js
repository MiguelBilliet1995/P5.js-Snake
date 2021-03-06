var s;
var scl = 50;
var f;
var f_special;
var f_special_activated = false;
var framert = 5;
var socket = io.connect("http://localhost:5000");

function setup() {

  // socket connetie

  createCanvas(1000, 1000);
  s = new Snake();
  f = new Food();
  f_special = new Food();
  frameRate(framert);
  pickLocation();
}

function requestSpecial(randm = true) {
  if (randm === true) {
    var kans = 3; // hoe lager nummer hoe meer kans op special food 
    var rnd1 = ceil(random(0, kans));
    var rnd2 = ceil(random(0, kans));
    if (rnd1 == rnd2) {
      f_special_activated = true;
    } else {
      f_special_activated = false;
    }
  } else {
    f_special_activated = true;
  }

  if (f_special_activated === true) {
    console.log("f_special activated");
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    foodLocation = createVector(floor(random(cols)), floor(random(rows)));
    foodLocation.mult(scl);
    f_special.initializeFood(foodLocation, true);
  }
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  foodLocation = createVector(floor(random(cols)), floor(random(rows)));
  foodLocation.mult(scl);
  f.initializeFood(foodLocation);
}

function draw() {
  background(51);
  s.death();
  s.update();
  s.show();

  if (f.eat() === true) {
    pickLocation();
    requestSpecial();
    // stuur naar server
    socket.emit('sound', {
      type: 'eat'
    });
  }

  if (f_special.eat() === true) {
    f_special_activated = false;
  }

  //fill(0);
  text("score = " + s.score + "/" + s.targetScore, 1000 - 100, 20);
  text("level = " + s.level, 1000 - 100, 40);

  var RGBcol = f.getColor();
  var RGBarray = RGBcol.array();
  fill(RGBarray[0], RGBarray[1], RGBarray[2]);
  rect(f.x, f.y, scl, scl);

  if (f_special_activated === true) {
    RGBcol = f_special.getColor();
    RGBarray = RGBcol.array();
    fill(RGBarray[0], RGBarray[1], RGBarray[2]);
    rect(f_special.x, f_special.y, scl, scl);
  }
}

// krijg socket gegevens

socket.on('inputChange', (data) => {
  console.log(data);

  switch (data.button) {
    case 'up':
      if (s.yspeed !== 1) {
        s.dir(0, -1);
      }
      break;
    case 'down':
      if (s.yspeed !== -1) {
        s.dir(0, 1);
      }
      break;
    case 'left':
      if (s.xspeed !== 1) {
        s.dir(-1, 0);
      }
      break;
    case 'right':
      if (s.xspeed !== -1) {
        s.dir(1, 0);
      }
      break;
    case 'potentiometer':
      frameRate((data.potentiometer / 1023) * 45 + 5);
      break;
    default:
      console.log("default");
      break;
  }
});