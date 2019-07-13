const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a Tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'a Tour name must have less or equal to 40 characters'],
      minlength: [8, 'a Tour name must have more than 8 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'a Tour must have a duration']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Lowest is 1'],
      max: [5, 'Highest is 5']
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
      trim: true,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only works on CREATE
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be less than actual price'
      }
    },
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
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
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

// Document Middleware runs before save() command and create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function(doc, next) {
//   next();
// });

// Query Middleware
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// tourSchema.post(/^find/,function(doc,next){
//   console.log(doc);
//   next();
// })

// Aggregation Middleware
tourSchema.pre('aggregate', function(next) {
  //
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
