const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    artist : {
        type : String,
        required : true
    },
    songUrl : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    language: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    album: {
        type: String,
    },
    createrId : {
        type : String
    }
},{timestamps : true});

module.exports = mongoose.model("song",songSchema);