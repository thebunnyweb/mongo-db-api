import mongoose from 'mongoose';
import constants from './constants'

mongoose.Promise = global.Promise;

try {
    mongoose.connect(constants.MONGO_URL);
} catch (e) {
    mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
    .once('open',()=>console.log('Mongo Running'))
    .on('error', err=>console.log(err))