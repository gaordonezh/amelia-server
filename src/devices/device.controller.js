const { handleError } = require('../../utils/functions');
const DeviceModel = require('./device.model');

module.exports.getDevices = async (req, res) => {
  try {
    const result = await DeviceModel.find({});
    return res.status(200).json(result);
  } catch (error) {
    return handleError({ res, error });
  }
};

module.exports.createDevice = async (req, res) => {
  try {
    await DeviceModel.create(req.body);
    return res.status(200).json({ success: true });
  } catch (error) {
    return handleError({ res, error });
  }
};

module.exports.updateDevice = async (req, res) => {
  try {
    const id = req.params.deviceId;
    const finder = await DeviceModel.findById(id);
    if (!finder) throw new Error('not found');

    Object.assign(finder, req.body);
    await DeviceModel.findByIdAndUpdate(id, finder);

    return res.status(200).json({ success: true });
  } catch (error) {
    return handleError({ res, error });
  }
};
