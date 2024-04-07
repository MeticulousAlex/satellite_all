var SerialPort = require("serialport");
const express = require('express');
const cors = require('cors');

const app = express();

const parser =  new SerialPort.ReadlineParser;
let coordinates;

var port = new SerialPort.SerialPort({
    path: 'COM5',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowCOntrol: false
});

port.pipe(parser);

parser.on('data', function(data){
    if (data.includes('$GNGGA')){
        const sections = data.split(',');
        const coords = {X:sections[2] / 100, Y:sections[4].substring(1) / 100}
        coordinates = coords;
        console.log(coords);
    }
})

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send(coordinates);
});

app.listen('3000', () => {
    console.log('running 3000');
})






