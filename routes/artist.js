const router = require('express').Router();
const {createArtist,getAllArtist,deleteArtist,getSearchArtist,
getRandomArtists} = require("../controllers/artist");

router.get("/",getAllArtist);
router.get("/search",getSearchArtist);
router.get("/random",getRandomArtists);
router.post("/",createArtist);
router.delete("/:id",deleteArtist);

module.exports = router;