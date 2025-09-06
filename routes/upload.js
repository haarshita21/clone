const express = require('express');
const { uploadAvatar, uploadMedia } = require('../controllers/uploadController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);
router.post('/media', protect, upload.single('media'), uploadMedia);

module.exports = router;