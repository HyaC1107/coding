const { Server } = require('socket.io');
const Message = require('../models/message');
const ChatRoom = require('../models/ChatRoom');

module.exports = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    socket.on('joinRoom', (roomId) => socket.join(roomId));
    socket.on('leaveRoom', (roomId) => socket.leave(roomId));

    socket.on('sendMessage', async ({ roomId, sender, content, imageUrl }) => {
      try {
        const msg = await Message.create({ roomId, sender, content, imageUrl });
        await ChatRoom.findByIdAndUpdate(roomId, {
          lastMessage: content || '이미지',
          lastMessageAt: new Date(),
        });
        io.to(roomId).emit('receiveMessage', {
          _id: msg._id,
          roomId,
          sender,
          content,
          imageUrl,
          createdAt: msg.createdAt,
        });
      } catch (e) {
        socket.emit('error', { message: '메시지 전송 실패' });
      }
    });
  });

  return io;
};
