const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const chat = new Chat({ senderId: req.user.id, receiverId, message });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Chat.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.receiverId },
        { senderId: req.params.receiverId, receiverId: req.user.id }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};