const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: 'Email already in use'
    },
    password: {
        type: String,
        // required: true,
        bcrypt: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

UserSchema.plugin(require('mongoose-bcrypt'));
UserSchema.plugin(findOrCreate);
module.exports = UserSchema;
