const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model("album",albumSchema);