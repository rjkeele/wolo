const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
   fullname: {
      type: String
   },
   email: {
      type: String
   },
   password: {
      type: String
   }
}, {
   collection: 'user'
})

module.exports = mongoose.model('User', User)