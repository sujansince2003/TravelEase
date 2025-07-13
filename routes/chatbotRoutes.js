const express = require('express');

const router = express.Router();

const responses = {
  hello: 'Hi there! How can I help you today?',
  hi: 'Hello! What can I assist you with regarding your travel plans?',
  'how are you':
    "I'm a bot, but I'm doing great! Thanks for asking. How can I help you?",

  // Tour info
  'what places can i visit':
    'We have amazing destinations like Chitwan National Park, Pokhara, Kathmandu Valley, Lumbini, and Everest Base Camp. Which one are you interested in?',
  'popular places in nepal':
    'Some must-visit places are Kathmandu, Pokhara, Chitwan, Lumbini, Everest Base Camp, Annapurna Circuit, and Rara Lake.',
  'adventure activities':
    'You can enjoy trekking, white-water rafting, paragliding, jungle safaris, mountain biking, and zip-lining in Nepal!',
  'cultural sites':
    'Explore World Heritage Sites like Pashupatinath Temple, Swayambhunath (Monkey Temple), Boudhanath, and Patan Durbar Square.',

  // Packages
  'do you offer tour packages':
    'Yes, we offer various tour packages, including adventure tours, cultural tours, treks, and wildlife safaris. Want help choosing one?',
  'can i customize my tour':
    'Absolutely! You can customize your itinerary, activities, and accommodations according to your preferences.',
  'group or solo tour':
    'We offer both group tours and private tours for solo travelers, couples, families, or corporate groups.',

  // Travel & Logistics
  'do i need a visa':
    'Most travelers can get a visa on arrival in Nepal. But please check your country’s eligibility or ask us for help.',
  'what is the currency in nepal':
    'The currency is Nepalese Rupee (NPR). 1 USD is approximately 130 NPR (check for current rates).',
  'best time to visit nepal':
    'The best time to visit Nepal is during spring (March–May) and autumn (September–November) for clear skies and good weather.',
  'is nepal safe':
    'Yes, Nepal is generally safe for tourists. We also provide experienced guides for treks and tours.',
  'what languages are spoken':
    'Nepali is the official language. English is widely spoken in tourist areas, hotels, and by guides.',

  // Booking
  'how to book a tour':
    'You can book directly from our website or contact us via email or phone. We’re happy to assist!',
  'how to pay':
    'We accept payment via credit/debit card, bank transfer, and digital wallets. Let us know your preference.',
  'do you provide accommodation':
    'Yes, our tour packages usually include hotel stays. You can choose between budget, standard, and luxury options.',
  'can i cancel or reschedule':
    'Yes, we have a flexible cancellation and rescheduling policy. Contact us at least 48 hours in advance.',

  // Contact
  'contact us':
    'You can reach us at info@yourtourismwebsite.com or call us at +977-9876543210.',
  'where are you located':
    'Our main office is in Thamel, Kathmandu. Feel free to visit or call us for assistance.',

  // Farewells
  'thank you': "You're welcome! Feel free to ask if you have more questions.",
  thanks: "You're most welcome. Let me know if I can help with anything else.",
  bye: 'Goodbye! Have a great day and safe travels!',
  'see you': 'See you! Wishing you an amazing travel experience in Nepal!',

  // Fallback
  default:
    "I'm sorry, I didn't understand that. Can you rephrase or ask something related to travel in Nepal?",
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
