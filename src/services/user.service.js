const admin = require('firebase-admin');
const userDao = require('../dao/user.dao');

const fireBaseSignup = async (user) => {
  const { uid } = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    displayName: user.fullName,
  });
  return uid;
};

const createUser = async (userObj) => {
  try {
    const user = {
      email: userObj.email,
      fullName: userObj.fullName,
    };

    const findUser = await userDao.findOne({ email: user.email });
    if (findUser) {
      return 'user already exists';
    }

    const fireBaseUserObj = {
      email: user.email,
      password: user.password,
      displayName: user.fullName,
    };

    return await fireBaseSignup(fireBaseUserObj).then((uid) => {
      const dbAccount = {
        email: user.email,
        fullName: user.fullName,
        fireBaseUid: uid,
      };
      return userDao.create(dbAccount);
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUser,
};
