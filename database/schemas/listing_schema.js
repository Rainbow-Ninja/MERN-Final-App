const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
      type: String,
      required: true 
    },
    blurb: {
      type: String,
      required: true 
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    image: {
        type: String
    },
    productOwner: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  });

  module.exports = ListingSchema;