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
app.use(express.json())
const port = 3000;
const address = `http://localhost:${port}/api`

app.route('/data').post(async(req, res) => { 
  try{
    console.log(req.body)
  } catch(err){
    console.log(err)
  }
});

app.route('/messages').get(async(req, res) => { 
  try{
    console.log(req.body)
  } catch(err){
    console.log(err)
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
