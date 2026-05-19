const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/message');

exports.getRooms = async (req, res) => {
  const { userId } = req.query;
  try {
    const rooms = await ChatRoom.find({ participants: userId }).sort({ lastMessageAt: -1 });
    return res.status(200).json(rooms);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getOrCreateRoom = async (req, res) => {
  const { participants, roomType, relatedId } = req.body;
  try {
    let room = await ChatRoom.findOne({ participants: { $all: participants, $size: participants.length } });
    if (!room) {
      room = await ChatRoom.create({ participants, roomType, relatedId });
    }
    return res.status(200).json(room);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.sendMessage = async (req, res) => {
  const { sender, content } = req.body;
  const roomId = req.params.roomId;
  const imageUrl = req.file ? req.file.path : undefined;
  try {
    const msg = await Message.create({ roomId, sender, content, imageUrl });
    await ChatRoom.findByIdAndUpdate(roomId, {
      lastMessage: content || '이미지',
      lastMessageAt: new Date(),
    });
    return res.status(201).json(msg);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
