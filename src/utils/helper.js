const passwordValidator = (req, res, next) => {
  if (req.password !== req.confirmPassword) {
    return 'password mistach';
  }
  return next();
};

module.exports = {
  passwordValidator,
};
