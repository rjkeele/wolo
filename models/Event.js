const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Event = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    e_date: {
        type: String
    },
    e_time: {
        type: String
    },
    img: {
        type: String
    },
    interested: {
        type: Array
    },
    registered: {
        type: Array
    }
}, {
   collection: 'event'
})

module.exports = mongoose.model('Event', Event)
