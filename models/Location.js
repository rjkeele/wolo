const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Location = new Schema({
    locationName: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    description: {
        type: String
    },
    draggable: {
        type: Boolean
    },
    practices: {
        type: Array
    }
}, {
    collection: 'location'
})

module.exports = mongoose.model('location', Location)
