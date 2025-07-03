const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Successful'));

//
//  Creating a simple tour model
//
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4
  },
  price: {
    type: Number,
    required: [true, 'Price must be specified']
  }
});
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Mustangggggg',
  rating: 4.6,
  price: 923
});
testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('Error!!!!!!!', err);
  });

// Upper samma ho Video 88 chalexa
//
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
