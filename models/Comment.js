const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Comment = new Schema({
    comment: {
        type: String
    },
    loc_id: {
        type: String
    },
    user_id: {
        type: String
    },
    updated_at: {
        type: Date
    }
}, {
   collection: 'comment'
});

module.exports = mongoose.model('Comment', Comment)
