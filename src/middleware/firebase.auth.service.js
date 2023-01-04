/**
 * Middleware Firebase JWT authentication
 */
const admin = require('firebase-admin');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.header.authorization;
  if (authHeader) {
    const authIdToken = authHeader.split(' ')[1];
    await admin
      .auth()
      .verifyIdToken(authIdToken)
      .then((decoded) => {
        // eslint-disable-next-line no-console
        console.log(decoded);
        return next();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Unauthorized ${error}`);
        return res.sendStatus(403);
      });
  }
  return res.sendStatus(401);
};

module.exports = {
  verifyJWT,
};
