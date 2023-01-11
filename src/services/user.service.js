const userDao = require('../dao/user.dao');

const createUser = async (userObj) => {
  try {
    const user = {
      fireBaseUid: userObj.fireBaseUid,
      email: userObj.email,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
    };
    const findUser = await userDao.findOne({ email: user.email });
    if (findUser) {
      throw new Error('User already exists');
    }
    return await userDao.create(user);
  } catch (error) {
    return error;
  }
};
module.exports = {
  createUser,
};
