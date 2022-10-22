const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { updateCurrentUser } = require('../validators/users');

router.get('/me', getCurrentUser);

router.patch('/me', updateCurrentUser, updateUser);

module.exports = router;
