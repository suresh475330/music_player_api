
const Album = require("../models/album");

const createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body)
        res.status(200).json({ msg: `${album.title} album created successfully` });

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

const getRandomAlbums = async (req, res) => {

    try {
        const { length } = req.query;
        if (!length) {
            return res.status(404).json({ msg: "Plz provide length of random albums" });
        }

        const randomAlbums = await Album.aggregate([{ $sample: { size: Number(length) } }])
        res.status(200).json({ randomAlbums });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}


const getSearchAlbums = async (req, res) => {
    try {

        const { title, select } = req.query;
        let allQuerys = [];

        // filtering
        if (title) {
            const queryString = title;
            const queryStrings = queryString.split(" ");
            queryStrings.forEach((element) => {
                allQuerys.push({ title: { $regex: String(element), $options: "i" } })
            })
        }

        let result = Album.find({ $or: allQuerys });

        // selected fildes
        if (select) {
            const selectList = select.split(",").join(" ");
            result = result.select(selectList)
        }

        const album = await result;

        res.status(200).json({ album });
    } catch (error) {
        res.status(404).json({ msg: error.message });

    }
}



const getAllAlbum = async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        res.status(404).json({ msg: error });
    }
}


const deleteAlbum = async (req, res) => {
    const { id: albumId } = req.params;

    const album = await Album.findByIdAndRemove({ _id: albumId, })

    if (!album) {
        return res.status(404).json({ msg: `No album with id : ${albumId}` })
    }

    res.status(200).json({ msg: `${album.title} deleted succes` })

}

module.exports = {
    createAlbum, getAllAlbum,
    deleteAlbum, getSearchAlbums,
    getRandomAlbums
};