
const Album = require("../models/album");

const createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body)
        res.status(200).json({msg : `${album.title} album created successfully`});

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

const getAllAlbum = async (req, res) => {
    try {
        const albums = await Album.find();
        return res.status(200).json(albums);
    } catch (error) {
        return res.status(404).json({ msg: error });
    }
}


const deleteAlbum = async (req, res) => {
    const { id: albumId } = req.params;

    const album = await Album.findByIdAndRemove({ _id: albumId, })

    if (!album) {
        return res.status(404).json({ msg: `No album with id : ${albumId}` })
    }

    res.status(200).send("deleted succes")
}

module.exports = { createAlbum,getAllAlbum,deleteAlbum };