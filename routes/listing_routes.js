const express = require("express");
const router = express.Router();
const ListingController = require("./../controllers/listing_controller");

router.get("/show", ListingController.index);

router.post("/new", ListingController.create);

router.get("/", ListingController.show);

router.get("/update", ListingController.edit);

router.put("/update", ListingController.update);

router.delete("/delete", ListingController.destroy);

router.get("/getuser", ListingController.getUser);

module.exports = router;