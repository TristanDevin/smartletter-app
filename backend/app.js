const express = require("express");
var request = require('request');

var fs = require('fs');

const app = express();  
app.use(express.json());
const port = 3000;
const address = `http://localhost:${port}/api`

function hexToAscii(hexString) {
  let asciiString = '';
  
  for (let i = 0; i < hexString.length; i += 2) {
      let hex = hexString.substr(i, 2);
      let decimal = parseInt(hex, 16);
      asciiString += String.fromCharCode(decimal);
  }
  
  return asciiString;
}

function hexToAscii(hexString) {
  let asciiString = '';
  
  for (let i = 0; i < hexString.length; i += 2) {
      let hex = hexString.substr(i, 2);
      let decimal = parseInt(hex, 16);
      asciiString += String.fromCharCode(decimal);
  }
  
  return asciiString;
}

app.route('/data').post(async(req, res) => { 
  try{
    var json = {"id":req.body.id};
    let letter_colis_string = hexToAscii(req.body.payload);
    letter_colis = letter_colis_string.split('/');
    json.letter = letter_colis[0];
    json.colis = letter_colis[1];
    json.datetime = req.body.datetime;
    json.recupere = false;
    console.log(json);

    var json = JSON.stringify(json);
    fs.writeFile('test.json', json, 'utf8', function(err) {
      if (err) console.log(err);
    });
  } catch(err){
    console.log(err);
  }
});

app.route('/messages').get(async(req, res) => { 
  console.log("get")
  fs.readFile('test.json', (err, data) => {
    if (err) console.log(err);
    res.send(data)
  });

  
});

app.route('/').get((req, res) => {
  res.send("Hello World !!");
});
app.route('/dev').get((req, res) => {
    res.send("test");    
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
