const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { handleError } = require('../../utils/functions');
const UserModel = require('../users/user.model');

dotenv.config();

const verifyToken = (token) => {
  const response = jwt.verify(token, process.env.SECRET);
  // @ts-ignore
  return response.data;
};

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' });
};

module.exports.checkToken = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) throw new Error('NOT FOUND BEARER TOKEN');

    verifyToken(token);

    next();
  } catch (error) {
    return handleError({ res, error });
  }
};

module.exports.validateToken = async (req, res) => {
  try {
    const token = req.get('Authorization');
    if (!token) throw new Error('NOT FOUND BEARER TOKEN');

    const userId = verifyToken(token);

    const user = await UserModel.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    return handleError({ res, error });
  }
};
