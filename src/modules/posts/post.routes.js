import {Router} from 'express';
import Post from './post.model';
import postvalidation from './post.validation';
import validate from 'express-validation';
import * as postcontroller from './post.controller';
import {authJwt} from '../../services/auth.services';


const routes = new Router();

routes.post('/post', authJwt , validate(postvalidation.createpost), postcontroller.createpost);
routes.patch('/updatepost/:id', authJwt, validate(postvalidation.createpost), postcontroller.updatepost)
routes.get('/posts', authJwt, postcontroller.listpost);

export default routes;
