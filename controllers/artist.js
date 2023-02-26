
const Artist = require("../models/artist");

const createArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body)
        res.status(200).json({msg : `${artist.name} artist created successfully`});
    } catch (error) {
        res.status(404).json({ msg: "Something worng on Ceated artist" })
    }
}

const getAllArtist = async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.status(200).json(artists);
    } catch (error) {
        return res.status(404).json({ msg: error });
    }
}


const deleteArtist = async (req, res) => {
    const { id: artistId } = req.params;

    const artist = await Artist.findByIdAndRemove({ _id: artistId, })

    if (!artist) {
        return res.status(404).json({ msg: `No artist with id : ${artistId}` })
    }

    res.status(200).send("deleted succes")
}

module.exports = { createArtist, getAllArtist, deleteArtist };