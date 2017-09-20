import express from 'express';
import constants from './config/constants';
import dbConfig from './config/db';
import middleware from './config/middleware';
import modules from './modules'

const app = express();
const PORT = constants.PORT;

middleware(app);
modules(app);

app.listen(PORT, err=>{
    if(!err){
        console.log(`
        App running on port ${PORT}
        Environment is ${process.env.NODE_ENV}
        `)
    }
})