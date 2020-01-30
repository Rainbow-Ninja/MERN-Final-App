const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("./../controllers/user_controller");


router.get("/", UserController.index);

router.post("/", UserController.create);

router.get("/new", UserController.make);

router.get("/:id", passport.authenticate('jwt', {
    session: false
}), UserController.show);

router.get("/edit/:id", UserController.edit);

router.put("/:id", UserController.update);

router.get("/getuser", UserController.getUser);

router.delete("/delete/:id", UserController.destroy);

module.exports = router;