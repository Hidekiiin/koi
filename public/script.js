const socket = io('/api/socket');

function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value;
  if (message.trim() !== '') {
    socket.emit('chat message', message);
    input.value = '';
  }
}

socket.on('chat message', (msg) => {
  const messagesDiv = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// ポーリングを実行する関数
function pollServer() {
    fetch('/api/poll')  // Vercelで動作しているAPIサーバーのURL
        .then(response => response.json())
        .then(data => {
            // サーバーからのデータを処理
            console.log('新しいデータ:', data);
            document.getElementById('message').innerText = `メッセージ: ${data.message} - 時間: ${data.timestamp}`;
            
            // 次のポーリングまでの間隔（例えば、5秒）
            setTimeout(pollServer, 5000);
        })
        .catch(error => {
            console.error('ポーリング中にエラーが発生:', error);
            setTimeout(pollServer, 5000);  // エラー時でも再試行
        });
}

// 初回ポーリング開始
pollServer();
