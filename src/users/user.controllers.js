const { handleError } = require('../../utils/functions');
const UserModel = require('./user.model');

module.exports.getUsers = async (req, res) => {
  try {
    const {} = req.query;
    // if (!worker) throw new Error('required fields');

    const result = await UserModel.find({});
    return res.status(200).json(result);
  } catch (error) {
    return handleError({ res, error });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    await UserModel.create(req.body);
    return res.status(200).json({ success: true });
  } catch (error) {
    return handleError({ res, error });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const finder = await UserModel.findById(id);
    if (!finder) throw new Error('not found');

    Object.assign(finder, req.body);
    await UserModel.findByIdAndUpdate(id, finder);

    return res.status(200).json({ success: true });
  } catch (error) {
    return handleError({ res, error });
  }
};
