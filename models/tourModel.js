const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a Tour must have a name'],
      unique: true,
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'a Tour must have a duration']
    },
    ratingsAverage: {
      type: Number
    },
    ratingsQuantity: {
      type: Number
    },
    price: {
      type: Number,
      required: [true, 'a Tour must have a price']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a Tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'a Tour must have a difficulty'],
      trim: true
    },
    priceDiscount: Number,
    summary: {
      type: String,
      required: [true, 'a Tour must have a summary'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'a Tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date]
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
