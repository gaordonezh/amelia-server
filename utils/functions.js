module.exports.objectCleaner = (params = {}) => {
  const clone = { ...params };
  Object.keys(clone).forEach((key) => {
    // if (onlyNull && clone[key] === null) delete clone[key];
    // else if (!clone[key]) delete clone[key];
    delete clone[key];
  });
  return clone;
};

module.exports.handleError = ({ res, error, msg = undefined, logger = true }) => {
  const message = error?.message;
  if (logger) {
    console.log('==================================================');
    console.log(message);
    console.log('==================================================');
  }
  return res.status(500).json({ msg: msg || message, description: message });
};
