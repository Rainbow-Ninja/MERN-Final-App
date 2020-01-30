const mongoose = require("mongoose");
const ListingSchema = require("./../schemas/listing_schema");

const ListingModel = mongoose.model("listings", ListingSchema);
module.exports = ListingModel;