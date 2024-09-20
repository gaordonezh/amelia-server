const { generateToken } = require('../middlewares/auth');
const { handleError } = require('../../utils/functions');
const UserModel = require('./user.model');
const bcrypt = require('bcrypt');

const AUTH_ERR_MSG = 'INCORRECT USERNAME OR PASSWORD';

module.exports.authUser = async (req, res) => {
  try {
    const { user, pass } = req.body;
    if (!user || !pass) throw new Error(AUTH_ERR_MSG);

    const finderUserModel = await UserModel.findOne({ isActive: true, username: user });
    if (!finderUserModel) throw new Error(AUTH_ERR_MSG);
    const userObj = finderUserModel.toJSON();

    console.log(pass, finderUserModel.password);

    if (!bcrypt.compareSync(pass, finderUserModel.password)) throw new Error(AUTH_ERR_MSG);

    const token = generateToken({ data: userObj._id });

    return res.status(200).json({ token, data: finderUserModel });
  } catch (error) {
    return handleError({ res, error });
  }
};

module.exports.registerUser = async (req, res) => {
  try {
    const body = req.body;
    const password = body.password;

    const changes = { password: bcrypt.hashSync(password, 10) };
    const user = new UserModel(req.body);

    Object.assign(user, changes);
    await user.save();

    // sendMail(req.body, password, req.sede);

    return res.status(200).json({ success: true });
  } catch (error) {
    return handleError({ res, error });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const { willcard, user, ndoc } = req.query;

    const filters = {
      isActive: true,
    };

    if (willcard) {
      filters.$or = [
        { firstName: { $regex: willcard, $options: 'i' } },
        { lastName: { $regex: willcard, $options: 'i' } },
        { email: { $regex: willcard, $options: 'i' } },
        { user: { $regex: willcard, $options: 'i' } },
        { phone: { $regex: willcard, $options: 'i' } },
      ];
    }
    if (user) filters._id = user;
    if (ndoc) filters.documentNumber = ndoc;

    const result = await UserModel.find(filters);
    return res.status(200).json(result);
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
