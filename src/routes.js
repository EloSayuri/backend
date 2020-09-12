import express from 'express';
import searchUser from './controllers/searchController.js';
import signIn from './controllers/signinController.js';
import signUp from './controllers/signupController.js';

const routes = express.Router();

routes.post('/signup', signUp);
routes.post('/signin', signIn);
routes.get('/search/:id_user', searchUser);

export default routes;