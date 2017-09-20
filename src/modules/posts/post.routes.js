import {Router} from 'express';
import Post from './post.model';
import postvalidation from './post.validation';
import validate from 'express-validation';
import * as postcontroller from './post.controller';


const routes = new Router();

routes.post('/post', validate(postvalidation.createpost), postcontroller.createpost);
routes.patch('/updatepost/:id', validate(postvalidation.createpost), postcontroller.updatepost)
routes.get('/posts', postcontroller.listpost);

export default routes;
