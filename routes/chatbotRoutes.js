const express = require('express');

const router = express.Router();

const responses = {
  hello: 'Hi there! How can I help you today?',
  hi: 'Hello! What can I assist you with regarding your travel plans?',
  'how are you':
    "I'm a bot, but I'm doing great! Thanks for asking. How can I help you?",
  'what places can i visit':
    'We have amazing destinations like Chitwan National Park, Pokhara, Kathmandu Valley, and Lumbini. Which one are you interested in?',
  'do you offer tour packages':
    'Yes, we offer various tour packages, including adventure tours, cultural tours, and wildlife safaris. Can I tell you more about any specific type?',
  'contact us':
    'You can reach us at info@yourtourismwebsite.com or call us at +977-9876543210.',
  'thank you': "You're welcome! Feel free to ask if you have more questions.",
  bye: 'Goodbye! Have a great day!',
  default:
    "I'm sorry, I don't understand that. Can you rephrase your question or ask something about our tourism services?",
};

router.post('/chatbotresponse', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let botResponse = responses.default;

  // Using Object.keys() for safer iteration
  Object.keys(responses).some((keyword) => {
    if (userMessage.includes(keyword)) {
      botResponse = responses[keyword];
      return true; // stops the iteration once a match is found
    }
    return false;
  });

  res.json({ reply: botResponse });
});

module.exports = router;
