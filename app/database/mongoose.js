import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);

export default mongoose;