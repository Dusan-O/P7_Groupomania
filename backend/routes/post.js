const express = require('express');
const router = express.Router();

const postCrtl = require('../controllers/post');
const multer = require('../middlewear/multer-config');
const auth = require('../middlewear/auth');

router.post('/', auth, multer, postCrtl.post);
router.get('/', auth, postCrtl.getPost);// recuperer les posts posté par les autres utilisateurs
router.delete('/', auth, postCrtl.deletePost);// supprimer le post

module.exports = router;
