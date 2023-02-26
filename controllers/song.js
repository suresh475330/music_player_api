const Song = require("../models/song");

const createSong = async (req,res) => {

    try {
        const song = await Song.create(req.body);
        return res.status(200).json({msg : `${song.title} song created successfully`});
    } catch (error) {   
        return res.status(404).json({msg : error.message});
    }

}

const getAllsongs = async (req,res) => {
    try {
        const songs = await Song.find({}).populate("artist", "name imageUrl -_id").populate("album", "title imageUrl -_id");
        return res.status(200).json(songs);
    } catch (error) {
        return res.status(404).json({msg : error.message});
    }
}

const deletesong = async (req,res) => {
    const { id: songId } = req.params;

    const song = await Song.findByIdAndRemove({ _id: songId, })

    if (!song) {
        return res.status(404).json({ msg: `No song with id : ${songId}` })
    }

    res.status(200).send("deleted succes")
}


module.exports = {createSong,getAllsongs,deletesong};