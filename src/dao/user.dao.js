const userModel = require('../model/user.model');

// this function creates an entry in mongodb
const create = async (params) => {
  try {
    return await userModel.create(params);
  } catch (error) {
    return error;
  }
};
const findAndUpdate = async (filter, update) => {
  try {
    return await userModel.findOneAndUpdate(filter, update);
  } catch (error) {
    return error;
  }
};

const findOne = async (filter) => {
  try {
    return await userModel.findOne(filter);
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
  findAndUpdate,
  findOne,
};
