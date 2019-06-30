const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB_1, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connected'))
  .catch(e => console.log('DB error:', e));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a Tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'a Tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Jax',
  rating: 4.9,
  price: 499
});

// testTour.save().then(doc => console.log(doc)).catch(e => console.log(e));

// Server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('Listening on Port: ', port);
});
