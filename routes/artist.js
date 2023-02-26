const router = require('express').Router();
const {createArtist,getAllArtist,deleteArtist} = require("../controllers/artist");

router.get("/",getAllArtist);
router.post("/",createArtist);
router.delete("/:id",deleteArtist);

module.exports = router;