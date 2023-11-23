const express = require("express");
var request = require('request');


const app = express();  
app.use(express.json())
const port = 3000;
const address = `http://localhost:${port}`

app.route('/data').post(async(req, res) => { 
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
