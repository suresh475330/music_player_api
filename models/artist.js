const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model("artist",artistSchema);