const Songs = require("../models/song");

const saveSong = async (req,res) => {

    try {
        const song = await Songs.create(req.body);
        return res.status(200).json({song : song,msg : "song created successfully"});
    } catch (error) {   
        return res.status(404).json({msg : error.message});
    }

}

const getAllsongs = async (req,res) => {
    try {
        const songs = await Songs.find();
        return res.status(200).json({songs : songs});
    } catch (error) {
        return res.status(404).json({msg : error.message});
    }
}


module.exports = {saveSong,getAllsongs};