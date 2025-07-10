import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51PTNSiJ0wkAZn6PJhCNyS5oVVOdyoGMfZCBJ5qPpi1mx06qlozG3A0uf2QuusuoTsdpnmEliRJ0IgIiEpTPMNX6B00sqfQ6i5H',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get Checkout Session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge for credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
