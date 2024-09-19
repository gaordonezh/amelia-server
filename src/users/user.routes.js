const { Router } = require('express');
const { createUser, getUsers, updateUser } = require('./user.controllers');

const userRouter = Router();

userRouter.get('', getUsers);
userRouter.post('', createUser);
userRouter.put('/:userId', updateUser);

module.exports = userRouter;
