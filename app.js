const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoute');
const bookingRouter = require('./routes/bookingRoute');
const viewRouter = require('./routes/viewRoutes');
const chatRouter = require('./routes/chatbotRoutes'); // Make sure this path is correct

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Implementing CORS
app.use(cors());
app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 1. Middleware
// Set Security HTTP header
app.use(helmet({ contentSecurityPolicy: false }));

// Development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again later...',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
// IMPORTANT: These *must* be before any routes that need to read req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use(express.urlencoded({ extended: true }));
app.use('/', viewRouter);

app.get('/logout', (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), // Set to a past date to remove the cookie
  });
  res.redirect('/'); // Redirect to home page
});

app.get('/.well-known/*', (req, res) => {
  res.status(204).end(); // No content
});

// API routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/chat', chatRouter); // This MUST be before app.all('*')

// 3. Catch-all for undefined routes (This MUST be the LAST route handler)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // Added status code
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
