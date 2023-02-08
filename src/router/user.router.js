const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

router.post('/users', async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).send({
      message: 'password mismatch',
    });
  }
  const user = await userService.createUser(req.body);
  return res.status(201).send(user);
});

// router.get('/user/:id/jobs', auth.verifyJWT, async(req, res) => {
// })

module.exports = router;
