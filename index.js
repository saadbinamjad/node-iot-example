const express = require('express');
const app = express();

const path = require('path');

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, () => {
  console.log('server started');
});

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}

function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}


app.post('/', function(req, res) {
  setTimeout(endBlink, 10000); 
  res.send('Blinking Started');
});


app.post('/stop', function(req, res) {
  setTimeout(endBlink, 0); 
  res.send('Blinking stopped');
});

