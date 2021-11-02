const mongoose = require("mongoose");

const notesSchema = new Schema({

    title: {
        type: String,
        required: true
    },   
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        Default : "general"
    },
    date: {
        type: Date,
        Default: Date.now
    }
    
})
const Notes = new mongoose.model('notes', notesSchema);
module.exports(Notes)