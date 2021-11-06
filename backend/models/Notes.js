const mongoose = require("mongoose");

const notesSchema =  new  mongoose.Schema({
  
    user:{
        //this give us a user id who write this note
        type: mongoose.Schema.Types.ObjectId
    },
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
module.exports = Notes;