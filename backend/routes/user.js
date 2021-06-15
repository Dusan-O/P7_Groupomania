const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewear/auth');
const multer = require('../middlewear/multerUser');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;