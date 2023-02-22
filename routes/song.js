const router = require('express').Router();
const {saveSong,getAllsongs} = require("../controllers/song");

router.post('/saveSong',saveSong);
router.get('/getAllSongs',getAllsongs);

module.exports = router;