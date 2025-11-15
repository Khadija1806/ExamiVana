const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.post('/', auth, sendMessage);
router.get('/:receiverId', auth, getMessages);

module.exports = router;