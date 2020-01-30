const mongoose = require("mongoose");
const UserSchema = require("./../schemas/user_schema");

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
