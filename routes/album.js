const router = require('express').Router();
const { createAlbum, getAllAlbum,
    deleteAlbum, getSearchAlbums,
    getRandomAlbums } = require("../controllers/album");

router.get("/", getAllAlbum);
router.get("/search", getSearchAlbums);
router.get("/random", getRandomAlbums);
router.post("/", createAlbum);
router.delete("/:id", deleteAlbum);

module.exports = router;