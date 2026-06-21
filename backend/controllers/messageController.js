const router = require('express').Router();

const authMiddleware = require('./../middleWares/authMiddleware');
const Chat = require('./../models/chat');
const Message = require('./../models/message');

router.post('/new-message', authMiddleware, async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    const savedMessage = await newMessage.save();

    await Chat.findByIdAndUpdate(req.body.chatId, {
      lastMessage: savedMessage._id,
      $inc: { unreadMessagesCount: 1 },
    });

    res.status(201).send({
      message: 'Message sent successfully',
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get('/get-all-messages/:chatId', authMiddleware, async (req, res) => {
  try {

    const messages = await Message.find({
      chatId: req.params.chatId
    }).sort({ createdAt: 1 });

    res.send({
      message: 'Messages fetched successfully',
      success: true,
      data: messages
    });

  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});

module.exports = router;