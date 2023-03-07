
const Artist = require("../models/artist");

const createArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body)
        res.status(200).json({msg : `${artist.name} artist created successfully`});
    } catch (error) {
        res.status(404).json({ msg: "Something worng on Ceated artist" })
    }
}

const getRandomArtists = async (req,res) => {
    try {
        const {length} = req.query;
        if(!length){
            return res.status(404).json({ msg: "Plz provide length of random artists" });
        }
        
        const randomArtist =  await Artist.aggregate([{$sample : {size : Number(length)}}])
        res.status(200).json({randomArtist});
    } catch (error) {
          res.status(404).json({ msg: error.message });
    }
}

const getSearchArtist = async (req, res) => {
    try {

        const { name, select } = req.query;
        let allQuerys = [];

        // filtering
        if (name) {
            const queryString = name;
            const queryStrings = queryString.split(" ");
            queryStrings.forEach((element) => {
                allQuerys.push({ name: { $regex: String(element), $options: "i" } })
            })
        }

        let result = Artist.find({ $or: allQuerys });

        // selected fildes
        if (select) {
            const selectList = select.split(",").join(" ");
            result = result.select(selectList)
        }

        const artist = await result;

        res.status(200).json({ artist});
    } catch (error) {   
        res.status(404).json({ msg: error.message });

    }
}


const getAllArtist = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(404).json({ msg: error });
    }
}


const deleteArtist = async (req, res) => {
    const { id: artistId } = req.params;

    const artist = await Artist.findByIdAndRemove({ _id: artistId, })

    if (!artist) {
        return res.status(404).json({ msg: `No artist with id : ${artistId}` })
    }

    res.status(200).json({msg : `${artist.name} deleted succes`})
}

module.exports = {
     createArtist, getAllArtist,
     deleteArtist,getSearchArtist,
     getRandomArtists };