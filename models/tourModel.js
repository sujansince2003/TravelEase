const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('./userModel');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a Name!!'],
      unique: true,
      trim: true,
      minlength: [8, 'A tour must have more or equal to 8 characters!!'],
      maxlength: [40, 'A tour must have less or equal to 40 characters!!'],
      // This is not useful because it produces error with white spaces.
      // validate: [validator.isAlpha, 'Tour name must only contain characters!!'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have duration!!'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a Group Size!!'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty!!'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a Price!!'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        // Inside the validator function the this keyword points to current document
        // while creating new document. This is not going to work on update.

        // This could also be done in array.
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be regular price!',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description!!'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a Cover Image!!'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJson
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// This is a virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// Document Middleware
// It runs before the .save() and .create() but not insertMany()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/********* This is used for embedding ********/
/*
tourSchema.pre('save', async function (next) {
  const guidesPromises = this.guides.map(async (id) => await User.findById(id));
  this.guides = await Promise.all(guidesPromises);

  next();
});
*/

// Document Middleware can have multiple pre save hook(middleware) or post.
tourSchema.post('save', function (doc, next) {
  next();
});

// Query Middleware

// The find in below code makes it Query Middleware and not Document Middleware
// tourSchema.pre('find', function (next) { // It works only for find here
// /^find/ This works for all the strings that starts with find.
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

tourSchema.post(/^find/, function (doc, next) {
  // A way to Calculate time taken from pre to post query using find.
  console.log(`Query took ${Date.now() - this.start} milliseconds.`);
  next();
});

// Aggregation Middleware
/*
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
*/

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
