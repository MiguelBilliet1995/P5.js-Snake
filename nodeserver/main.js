const port = 5000;
const express = require('express');
const socket = require('socket.io');
var MidiPlayer = require('midi-player-js');
var five = require('johnny-five'),
    board = new five.Board();

board.on('ready', function () {
    const app = express();

    const server = app.listen(port, () => {
        console.log("NodeServer:", "poort: " + port);
    });

    // site zelf
    app.use(express.static('public'));

    //socket 
    const io = socket(server);

    io.on("connection", (socket) => {
        console.log("NodeServer:", "socket: connected: " + socket.id);

        // button presses
        this.pinMode(0, five.Pin.ANALOG); // potentiometer
        this.pinMode(2, five.Pin.INPUT); // left
        this.pinMode(4, five.Pin.INPUT); // down
        this.pinMode(7, five.Pin.INPUT); // right
        this.pinMode(8, five.Pin.INPUT); // up

        this.pinMode(5, five.Pin.PWM); // buzzer

        // buze test

        //this.analogWrite(5, 0);

        var Player = new MidiPlayer.Player(function (event) {
            board.analogWrite(5, event.noteNumber);
        });

        /*Player.loadFile('midi/imperial.mid');
        Player.play();*/




        // inputs

        let oldVoltage = 10;


        this.analogRead(0, function (voltage) {
            bufferValue = 10;
            minValue = oldVoltage - bufferValue;
            maxValue = oldVoltage + bufferValue;
            if (!(minValue <= voltage && maxValue >= voltage)) {
                io.sockets.emit('inputChange', {
                    button: "potentiometer",
                    potentiometer: voltage
                });
                console.log(voltage);
                oldVoltage = voltage;
            }

        });

        this.digitalRead(4, function (value) {
            if (value === 1) {
                console.log('down');
                io.sockets.emit('inputChange', {
                    button: "down"
                });
            }
        });

        this.digitalRead(8, function (value) {
            if (value === 1) {
                console.log('up');
                io.sockets.emit('inputChange', {
                    button: "up"
                });
            }
        });

        this.digitalRead(2, function (value) {
            if (value === 1) {
                console.log('left');
                io.sockets.emit('inputChange', {
                    button: "left"
                });
            }
        });

        this.digitalRead(7, function (value) {
            if (value === 1) {
                console.log('right');
                io.sockets.emit('inputChange', {
                    button: "right"
                });
            }
        });

    });

});