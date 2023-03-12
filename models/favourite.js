const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    favourites : [
        {
            type: mongoose.Types.ObjectId,
            ref : "song",
        }
    ]
},{timestamps : true});

module.exports = mongoose.model("favourite",favouriteSchema);