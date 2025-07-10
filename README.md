<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/sudeepgtm777/natours/main/public/img/logo-green-round.png" alt="Natours" width="200"></a>
  <br>
  Natours
  <br>
</h1>

<h4 align="center">An awesome tour booking site built on top of NodeJS.</h4>

## Deployed Version

Live Demo : https://natours-sudeepgtm777.vercel.app/

## Description

The Natours API is a RESTful API for a tour booking application. The project demonstrates the implementation of various backend functionalities, including user authentication, tour management, and booking features. The API is built using Node.js, Express, MongoDB, and other related technologies
Natours is a website for the Travel industry. The user can select a tour and book it.

## Key Features

<h3>• User Authentication and Authorization: </h3>

**→ Signup and Login:** Users can create accounts and log in using JWT (JSON Web Tokens) for authentication.<br>
**→ Password Reset:** Functionality for users to reset their passwords via email.

<h3>• Tour Management: </h3>

**→ CRUD Operations:** Create, read, update, and delete tours.<br>
**→ Tour Features:** Include details such as duration, difficulty, price, summary, description, start dates, and more.<br>
**→ Tour Reviews:** Users can add and manage reviews for tours.

<h3>• Booking System: </h3>

**→ Tour Booking:** Users can book tours.<br>
**→ Stripe Integration:** Payment processing using the Stripe API.

<h3>• Advanced Querying and Filtering: </h3>

**→ Sorting, Filtering, and Pagination:** Implemented for tours based on various criteria.<br>
**→ Aggregation:** MongoDB aggregation framework for advanced data processing.

<h3>• Geospatial Queries: </h3>

**→ Geolocation:** Finding tours within a certain distance from a point.<br>
**→ Map Integration:** Displaying tours on a map using third-party services.

<h3>• Security and Performance: </h3>

**→Data Sanitization:** Preventing NoSQL injection and other vulnerabilities.<br>
**→Rate Limiting:** Limiting the number of requests from a single IP.<br>
**→Helmet:** Setting security-related HTTP headers.<br>
**→Compression:** Compressing responses to improve performance.

## Technologies Used

**• Node.js:** JavaScript runtime for building server-side applications.<br>
**• Express:** Web framework for Node.js, providing robust features for building APIs.<br>
**• MongoDB:** NoSQL database for storing tour, user, and booking data.<br>
**• Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.<br>
**• Maptiler:** The use of maps to create high-quality world maps.<br>
**• Pug:** High performance template engine.<br>
**• JWT:** JSON Web Tokens for user authentication.<br>
**• Postman:** API testing.<br>
**• Stripe:** Payment processing for handling tour bookings.<br>
**• Mailtrap:** Email delivery platform.<br>
**• Email Services:** Nodemailer and third-party email services for sending emails.<br>
**• Vercel:** Cloud platform<br>
**• esbuild:** An extremely fast bundler for the web.<br>
**• Other Libraries:** Various npm packages for validation, security, and utility functions.<br>

## How To Use

### Book a tour

- Login or Signup to the site
- Search for tours that you want to book
- Book a tour
- Proceed to the payment
- Enter the card details (Test Mode):<br>
  • Card No. : 4242 4242 4242 4242<br>
  • Expiry date: Any Future date<br>
  • CVV: Any
- Finished!
- You can add other tour to your bookings.

### Manage your booking

You can manage all the bookings you have done by visiting your profile and **My bookings**.

### Update your profile

You can update your own username, profile photo, email and password.

## Deployment

The website is deployed with the help of vercel(Cloud Platform).

## Installation

You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running

npm i <br>
set your env variables <br>
npm run watch:js(for building files:This will allow to build js files in background.)(You can build the js files using npm run build:js after completing the project.) <br>
npm run dev (for development) <br>
npm run start (for production)<br>
npm run debug (for debug)

## Known Bugs

If found any bug, You may try to solve it or inform me. Thank you!

## Acknowledgement

The project is part of the online course at Udemy. Thanks to [Jonas Schmedtmann](https://twitter.com/jonasschmedtman) for creating this course!

## Screenshots

**Home Page**
![Home Page Natours ](/public/img/homepage.png)

**Signup**
![Signup Natours ](/public/img/signup.png)

**Login**
![Login Natours ](/public/img/login.png)

**Profile**
![Profile Natours ](/public/img/user.png)

**Tour**
![Tour Natours ](/public/img/tour.png)

**Payment**
![Payment Natours ](/public/img/payment.png)
