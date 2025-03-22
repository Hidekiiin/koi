import { Server } from 'socket.io';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('🔗 Initializing new Socket.io server...');
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('✅ ユーザー接続しました');

      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

      socket.on('disconnect', () => {
        console.log('❌ ユーザー切断しました');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('⚡️ Socket.io サーバーは既に起動しています');
  }

  res.end();
}
