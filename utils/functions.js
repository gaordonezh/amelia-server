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
  if (logger) console.log('error:', error);

  return res.status(500).json({ msg: msg ?? error?.message, description: error?.message });
};
