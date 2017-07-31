const config =  require('./config/config');
const express =  require('express');
const bodyParser = require('body-parser');

const mongoose =  require('./database/mongoose');
const notesController =  require('./controllers/notesController');
const userController =  require('./controllers/userController');
const shareController = require('./controllers/shareController');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// routes
notesController(app);
userController(app);
shareController(app);

app.listen(port, () => console.log(`App is online at port ${port}`));

module.exports = app;