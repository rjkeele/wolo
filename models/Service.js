const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Service = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    img: {
        type: String
    }
}, {
   collection: 'service'
})

module.exports = mongoose.model('Service', Service)
