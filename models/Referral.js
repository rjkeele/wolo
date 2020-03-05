const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Referral = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    businessName: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    },
    comment: {
        type: String
    }
}, {
   collection: 'referral'
});

module.exports = mongoose.model('Referral', Referral);
