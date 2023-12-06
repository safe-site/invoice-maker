
// Replace 'YOUR_BOT_TOKEN' and 'YOUR_CHAT_ID' with your actual bot token and chat ID
const botToken = '6855237376:AAFuMStmnVv6TxgTJxSOgZbthGoni2nSAIg';
const chatId = '5192707470';

// Function to send a message to the Telegram bot
function notifyTelegram(message) {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = new URLSearchParams({
    chat_id: chatId,
    text: message,
  });

  // Use the Fetch API to send a POST request to the Telegram API
  fetch(`${apiUrl}?${params}`, {
    method: 'POST',
  });
}

// Send a notification when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  const currentPageUrl = window.location.href;
  const notificationMessage = `User visited: ${currentPageUrl}`;
  notifyTelegram(notificationMessage);
});
