require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const initSocket = require('./socket');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('[MongoDB] connected'))
  .catch((err) => console.error('[MongoDB] connection error:', err));

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/companies', require('./routes/companies'));
app.use('/requests', require('./routes/requests'));
app.use('/tool-requests', require('./routes/toolRequests'));
app.use('/chat', require('./routes/chat'));
app.use('/reviews', require('./routes/reviews'));
app.use('/notifications', require('./routes/notifications'));
app.use('/ad', require('./routes/ad'));
app.use('/notices', require('./routes/notices'));
app.use('/qna', require('./routes/qna'));
app.use('/admin', require('./routes/admin'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

const httpServer = createServer(app);
initSocket(httpServer);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`[Server] running on port ${PORT}`));
