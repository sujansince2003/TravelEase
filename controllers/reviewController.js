const Review = require('../models/reviewModel');
const factory = require('./handleFactory');
// const catchAsync = require('../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

/****** The use of factory model to get all Review. *******/
exports.getAllReviews = factory.getAll(Review);

/****** The use of factory model to get Review. *******/
exports.getReview = factory.getOne(Review);

/****** The use of factory model to create Review. *******/
exports.createReview = factory.createOne(Review);

/****** The use of factory model to update Review. *******/
exports.updateReview = factory.updateOne(Review);

/****** The use of factory model to delete Review. *******/
exports.deleteReview = factory.deleteOne(Review);
