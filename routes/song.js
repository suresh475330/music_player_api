const router = require('express').Router();
const {createSong,getAllsongs,deletesong,
    getSearchSongs,getRandomSongs} = require("../controllers/song");

router.get('/',getAllsongs);
router.get('/search',getSearchSongs);
router.get('/random',getRandomSongs);
router.post('/',createSong);
router.delete('/:id',deletesong);

module.exports = router;