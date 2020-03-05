const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Practice = new Schema({
    description: {
        type: String
    }
}, {
    collection: 'practice'
});

module.exports = mongoose.model('Practice', Practice)
