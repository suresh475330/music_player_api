const Song = require("../models/song");

const createSong = async (req, res) => {

    try {
        const song = await Song.create(req.body);
        res.status(200).json({ msg: `${song.title} song created successfully` });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }

}

const getSearchSongs = async (req, res) => {
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

        let result = Song.find({ $or: allQuerys });

        // selected fildes
        if (select) {
            const selectList = select.split(",").join(" ");
            result = result.select(selectList)
        }

        const songs = await result.populate("artist", "name imageUrl -_id");

        res.status(200).json({ songs });
    } catch (error) {
        res.status(404).json({ msg: error.message });

    }
}

const getRandomSongs = async (req, res) => {
    try {
        const { length } = req.query;
        if (!length) {
            return res.status(404).json({ msg: "Plz provide length of random songs" });
        }

        const randomSongs = await Song.aggregate([{ $sample: { size: Number(length) } }])
        await Song.populate(randomSongs, { path: "artist", select: { "name": 1, "imageUrl": 1, "_id": 0 } });
        res.status(200).json({ randomSongs });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

const getAllsongs = async (req, res) => {
    try {

        const { albumId, artistId, sort, select } = req.query
        let queryObj = {};

        // filtering
        if (albumId) {
            queryObj.album = albumId;
        }
        if (artistId) {
            queryObj.artist = artistId
        }

        let result = Song.find(queryObj);

        // sort
        if (sort) {
            const sortList = sort.split(',').join(" ");
            result = result.sort(sortList)
        } else {
            result = result.sort({ createdAt: "desc" });
        }

        // selected fildes
        if (select) {
            const selectList = select.split(",").join(" ");
            result = result.select(selectList)
        }

        // page 
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        result = result.skip(skip).limit(limit)
        const songs = await result.populate("artist", "name imageUrl -_id").populate("album", "title imageUrl -_id");

        if (artistId || albumId) {
            return res.status(200).json(songs);
        }
        const songslength = await Song.estimatedDocumentCount();
        const pagesLength = Math.floor(songslength / 10) + 1;

        res.status(200).json({ songs, pageCount: pagesLength });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

const deletesong = async (req, res) => {
    const { id: songId } = req.params;

    const song = await Song.findByIdAndRemove({ _id: songId, })

    if (!song) {
        return res.status(404).json({ msg: `No song with id : ${songId}` })
    }

    res.status(200).json({ msg: `${song.title} deleted succes` });

}

const getSongById = async (req, res) => {
    const { id: songId } = req.params;

    try {
        const song = await Song.findOne({ _id: songId });
        res.status(200).json(song);
    } catch (error) {

        res.status(404).json({ msg: error.message });
    }


}


module.exports = {
    createSong, getAllsongs,
    deletesong, getSearchSongs,
    getRandomSongs,getSongById
};