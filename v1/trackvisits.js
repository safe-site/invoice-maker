// Replace 'YOUR_BOT_TOKEN' and 'YOUR_CHAT_ID' with your actual bot token and chat ID
const botToken = '6855237376:AAFuMStmnVv6TxgTJxSOgZbthGoni2nSAIg';
const chatId = '5816023717';

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
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
    })
    .catch(error => console.error('Notification error:', error));
}

// Function to get user agent information
function getUserAgentInfo() {
  return navigator.userAgent;
}

// Function to throttle notifications
let lastNotificationTime = 0;
const notificationInterval = 30000; // 30 seconds

// Send a notification when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  const currentTime = new Date().getTime();
  if (currentTime - lastNotificationTime > notificationInterval) {
    const currentPageUrl = window.location.href;
    const userAgentInfo = getUserAgentInfo();
    const notificationMessage = `User visited: ${currentPageUrl}\nUser Agent: ${userAgentInfo}`;
    notifyTelegram(notificationMessage);
    lastNotificationTime = currentTime;
  }
});

// Example for tracking button click
const buttonElement = document.getElementById('myButton');

if (buttonElement) {
  buttonElement.addEventListener('click', () => {
    const buttonClickMessage = 'User clicked the button';
    notifyTelegram(buttonClickMessage);
  });
}
