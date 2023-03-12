const router = require('express').Router();
const { getAllFavourites, findOneByUserId, addFavourite, removeFavourite } = require("../controllers/favourite");

router.get("/", getAllFavourites);
router.get("/:id", findOneByUserId);
router.patch("/addFavourite",addFavourite);
router.delete("/removeFavourite",removeFavourite);

module.exports = router;