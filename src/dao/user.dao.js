const userModel = require('../model/user.model');

const create = async (params) => {
  try {
    return await userModel.create(params);
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
};
