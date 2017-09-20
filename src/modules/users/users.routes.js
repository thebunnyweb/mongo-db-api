import {Router} from 'express';
import User from './users.model';
import userValidation from './users.validation';
import * as userController from './users.controllers';
import validate from 'express-validation';
import {authLogin} from '../../services/auth.services';

const routes = new Router();

routes.post('/signup', validate(userValidation.userpostvalidation), userController.signup)
routes.post('/login', authLogin, userController.login)
routes.get('/getusers', userController.getusers)

export default routes;