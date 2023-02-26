const router = require('express').Router();
const {createAlbum,getAllAlbum,deleteAlbum} = require("../controllers/album");

router.get("/",getAllAlbum);
router.post("/",createAlbum);
router.delete("/:id",deleteAlbum);

module.exports = router;