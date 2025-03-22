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
