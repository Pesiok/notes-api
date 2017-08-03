require('./config/config');
const express =  require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const mongoose =  require('./database/mongoose');
const notesController =  require('./controllers/notesController');
const userController =  require('./controllers/userController');
const shareController = require('./controllers/shareController');
const resourcesController = require('./controllers/resourcesController');

const app = express();
const port = process.env.PORT;

// middleware
app.use(helmet());
app.use(bodyParser.json());

// routes
notesController(app);
userController(app);
shareController(app);
resourcesController(app);

app.listen(port, () => console.log(`App is online at port ${port}`));

module.exports = app;