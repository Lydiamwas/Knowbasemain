const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const path = __dirname + "/app/views/";

const app = express();
const uploadRouter = require("./kb_upload/routers/file.router.js");

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:4000",
};

app.use(cors(corsOptions));
require("dotenv").config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models/");
db.sequelize.sync();
const uplds = require("./kb_upload/models/");
uplds.sequelize.sync();

app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Knowledgebase application." });
});

require("./app/routes/kbdoc.routes.js")(app);
app.use("/file", uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server on at http://localhost:${PORT}`);
});
module.exports = app;
