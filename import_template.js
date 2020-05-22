var five = require('johnny-five'),
    board = new five.Board();

board.on('ready', function () {
    this.pinMode(1, five.Pin.ANALOG); // photoresistor
    this.analogRead(1, function (voltage) {
        console.log(voltage);
    });
});