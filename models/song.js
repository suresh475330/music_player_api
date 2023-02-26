const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    songUrl: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref : "artist",
        required: true
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: "album"
    }

}, { timestamps: true });

module.exports = mongoose.model("song", songSchema);