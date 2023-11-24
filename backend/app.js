const express = require("express");
var request = require('request');
import { Pool, types } from "pg";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_USER,
} from "./env";

const pool = new Pool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASS,
  port: DATABASE_PORT,
});


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
  try{
    console.log(req.body);
  } catch(err){
    console.log(err);
  }
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
