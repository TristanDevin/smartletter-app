const express = require("express");
const app = express();
const port = 3000;
app.route('/').get((req, res) => {
  res.send("Hello World!");
});
app.route('/dev').get((req, res) => {
    res.send("test");    
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
