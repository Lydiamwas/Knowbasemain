const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./app/models");
db.sequelize.sync();

const path = __dirname + '/app/views/';

const app = express();

app.use(express.static(path));


var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));



constdb = require("./app/models/");
db.sequelize.sync();

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});


//db.sequelize.sync({ force: true }).then(() => {
//console.log("Drop and re-sync db.");
//});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Knowledgebase application." });
});

require("./app/routes/kbdoc.routes.js")(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running on " + PORT);
});
module.exports = app;