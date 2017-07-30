import config from './config/config';
import express from 'express';

import mongoose from './database/mongoose';
import notesController from './controllers/notesController';
import userController from './controllers/userController';

const app = express();
const port = process.env.PORT;

app.user(bodyParser.json());

// routes
notesController(app);
userController(app);

app.listen(port, () => console.log(`App is online at port ${port}`));

export default app;