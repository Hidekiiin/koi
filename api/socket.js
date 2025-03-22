import { Server } from 'socket.io';

export default function handler(req, res) {
  // Socket.io サーバーが未起動の場合のみ初期化
  if (!res.socket.server.io) {
    console.log('🔗 Initializing new Socket.io server...');
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('✅ ユーザー接続しました');

      // メッセージ受信時に全ユーザーへブロードキャスト
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

      // 切断時の処理
      socket.on('disconnect', () => {
        console.log('❌ ユーザー切断しました');
      });
    });

    // Socket.io サーバーをセット
    res.socket.server.io = io;
  } else {
    console.log('⚡️ Socket.io サーバーは既に起動しています');
  }

  // 必ずレスポンスを終了
  res.end();
}
