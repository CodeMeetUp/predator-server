const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
//

router.post('/user', async (req, res) => {
  const user = await userService.createUser(req.body);
  return res.status(201).send(user);
});

// router.get('/user/:id/jobs', auth.verifyJWT, async(req, res) => {
// })

module.exports = router;
