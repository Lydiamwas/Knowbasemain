const express = require('express');
const app = express();


const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');
  

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
}); 

let router = require('./app/routers/file.router.js');
app.use('/', router);



let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});










