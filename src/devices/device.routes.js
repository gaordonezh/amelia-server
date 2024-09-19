const { Router } = require('express');
const { createDevice, getDevices, updateDevice } = require('./device.controller');

const deviceRouter = Router();

deviceRouter.get('', getDevices);
deviceRouter.post('', createDevice);
deviceRouter.put('/:infoId', updateDevice);

module.exports = deviceRouter;
