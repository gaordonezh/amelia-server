const { Router } = require('express');
const { registerUser, getUsers, updateUser, authUser } = require('./user.controllers');
const { checkToken, validateToken } = require('../middlewares/auth');

const userRouter = Router();

userRouter.get('', checkToken, getUsers);
userRouter.put('/:userId', checkToken, updateUser);
userRouter.get('/validate', validateToken);

userRouter.post('', registerUser);
userRouter.post('/auth', authUser);

module.exports = userRouter;
