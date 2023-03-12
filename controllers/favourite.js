
const Favourite = require("../models/favourite");


const getAllFavourites = async (req, res) => {
    const { userId } = req.query;
    try {

        if (userId) {
            const userFavourites = await Favourite.find({ user: userId });
            return res.status(200).json(userFavourites);
        }
        const AllFavourites = await Favourite.find({});
        res.status(200).json(AllFavourites);
    } catch (error) {
        res.status(404).josn({ msg: error.message });
    }
}

const findOneByUserId = async (req, res) => {

    const { id: userID } = req.params
    const popObj = {
        path: 'favourites',
        populate: {
            path: 'artist',
            select: "name imageUrl -_id",
        }
    };

    try {
        const userFavourites = await Favourite.find({ user: userID }).populate(popObj);
        res.status(200).json(userFavourites);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}



const addFavourite = async (req, res) => {
    const { userId, songId } = req.body;

    try {

        const song = await Favourite.find({ user: userId, favourites: { "$in": [songId] } });
        if (song.length > 0) {
            return res.status(200).json({ msg: `song is already in favourites, songId  : ${songId}` })
        }
        await Favourite.updateOne({ user: userId }, {
            $push: { favourites: songId },
        });
        res.status(200).json({ msg: "Song added to favourites" });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

const removeFavourite = async (req, res) => {
    const { userId, songId } = req.body;

    try {
        const song = await Favourite.find({ user: userId, favourites: { "$in": [songId] } });
        if (song.length === 0) {
            return res.status(200).json({ msg: `No song is there with songId  : ${songId}` })
        }
        await Favourite.updateOne({ user: userId }, {
            $pull: { favourites: { $in: [songId] } },
        });
        res.status(200).json({ msg: "Song removed from favourites" });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

module.exports = { getAllFavourites, findOneByUserId, addFavourite, removeFavourite };