function Food(){
  this.x = 5;
  this.y = 7;
  var arrayTypes = ["NORMAL","2POINT","CHANGECOLOR","BONUSPOINTS","MORESPEED","LESSSPEED"];
  this.type = "";
  console.log(arrayTypes.length + " Food types loaded");
  
  this.initializeFood = function(pos,specialfood = false){
    console.log("Start initFood");
    if(specialfood == true){ //3
        var randomNumber = ceil(random(0,arrayTypes.length-1));
        console.log(randomNumber);
    }else{
      randomNumber = 0;
    }
    this.type = arrayTypes[randomNumber];
    console.log("this.type = " + this.type);
    this.x = pos.x;
    this.y = pos.y;
  }
  
  this.eat = function(){
    var d = dist(this.x,this.y,s.x,s.y);
    if(d<1){
      switch(this.type){
        case "NORMAL":
          s.total ++;
          s.addScore(1);
          break;
        case "2POINT":
          s.total ++;
          s.addScore(2);
          break;
        case "CHANGECOLOR":
          s.addScore(1);
          s.total ++;
          s.invsible();
          break;
        case "BONUSPOINTS":
          s.total ++;
          s.addScore(ceil(random(-1,5*s.level)));
          break;
        case "MORESPEED":
            s.total ++;
            s.addScore(1);
            framert = framert + 10;
            frameRate(framert);
          break;
        case "LESSSPEED": //more
            s.total ++;
            s.addScore(1);
            framert = framert + 2;
            frameRate(framert);
          break;
      }
      return true;
    }else{
      return false;
    }
  }
  
  this.getColor = function(){
    switch(this.type){
      case "NORMAL":
        return createVector(255,0,100);
        break;
      case "2POINT":
        return createVector(46,204,113);
        break;
      case "CHANGECOLOR":
        return createVector(46,204,113);
        break;
      case "BONUSPOINTS":
        return createVector(234,181,67);
        break;
      case "MORESPEED":
        return createVector(46,204,113);
        break;
      case "LESSSPEED":
        return createVector(46,204,113);
        break;
    }
  }
  
}