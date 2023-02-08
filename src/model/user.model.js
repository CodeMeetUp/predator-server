/**
 * User Model
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema defined the structure of the document for each user
// stored in the mongoDB database collection "users"
const UserSchema = new Schema({
  fireBaseUid: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  fullName: String,
  role: {
    type: String,
    default: 'user',
  },
});

module.exports = mongoose.model('users', UserSchema);
