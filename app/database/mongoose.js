const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, { useMongoClient: true })
    .then(() => console.log('Connected to the Database'))
    .catch(error => console.log(`Failed to connect to the Database with error: ${error}`));

module.exports = mongoose;