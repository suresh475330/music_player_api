const router = require('express').Router();
const {createSong,getAllsongs,deletesong,
    getSearchSongs,getRandomSongs,getSongById} = require("../controllers/song");

router.get('/',getAllsongs);
router.get('/search',getSearchSongs);
router.get('/random',getRandomSongs);
router.post('/',createSong);
router.get('/:id',getSongById);
router.delete('/:id',deletesong);

module.exports = router;