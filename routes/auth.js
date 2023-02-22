const router = require('express').Router();
const {login,getAllUser,deleteUser} = require("../controllers/auth")


router.get("/login",login);
router.get("/getAllUsers",getAllUser);
router.delete("/deleteUser/:id",deleteUser);


module.exports = router;