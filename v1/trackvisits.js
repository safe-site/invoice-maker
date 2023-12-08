// Function to generate a random dummy username
function generateDummyUsername() {
    const adjectives = ['Happy', 'Sad', 'Funny', 'Clever', 'Silly'];
    const nouns = ['Penguin', 'Elephant', 'Banana', 'Rocket', 'Sunshine'];
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
    return `${randomAdjective}${randomNoun}`;
  }
  
  // Function to get or initialize the user data
  function getUserData() {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : {};
  }
  
  // Function to prompt user for email and validate
  function promptForEmail() {
    const userData = getUserData();
  
    // If the user has already provided an email, use it
    if (userData.email) {
      return userData;
    }
  
    let isValidEmail = false;
    let userEmail;
  
    while (!isValidEmail) {
      userEmail = prompt('Enter your email:');
  
      if (userEmail === null) {
        // User canceled the prompt
        userData.username = generateDummyUsername();
        break;
      }
  
      // Simple email validation
      isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
  
      if (!isValidEmail) {
        alert('Invalid email format. Please try again.');
      }
    }
  
    if (isValidEmail) {
      userData.email = userEmail;
      // Save the updated user data
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  
    return userData;
  }
  
  // Function to update and save user data
  function updateUserStats() {
    const userData = promptForEmail();
    const currentPageUrl = window.location.href;
  
    // Increment visit count for the current page
    userData[currentPageUrl] = (userData[currentPageUrl] || 0) + 1;
  
    // Save the updated user data
    localStorage.setItem('userData', JSON.stringify(userData));
  
    // Notify Telegram with user information
    const notificationMessage = `User ${userData.email || userData.username} visited ${currentPageUrl} (${userData[currentPageUrl]} times)`;
    notifyTelegram(notificationMessage);
  }
  
  // Function to send a message to the Telegram bot
  function notifyTelegram(message) {
    const botToken = '6855237376:AAFuMStmnVv6TxgTJxSOgZbthGoni2nSAIg';
const chatId = '5816023717';
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
  document.addEventListener('DOMContentLoaded', updateUserStats);

      
