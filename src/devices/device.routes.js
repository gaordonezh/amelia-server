const { Router } = require('express');
const { createDevice, getDevices, updateDevice } = require('./device.controller');
const { checkToken } = require('../middlewares/auth');

const deviceRouter = Router();

deviceRouter.use(checkToken);

deviceRouter.get('', getDevices);
deviceRouter.post('', createDevice);
deviceRouter.put('/:deviceId', updateDevice);

module.exports = deviceRouter;
