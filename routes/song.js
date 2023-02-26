const router = require('express').Router();
const {createSong,getAllsongs,deletesong} = require("../controllers/song");

router.post('/',createSong);
router.get('/',getAllsongs);
router.delete('/:id',deletesong);

module.exports = router;