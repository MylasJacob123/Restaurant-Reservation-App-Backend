const express = require("express");
const { getRestaurants, addRestaurant } = require("../controllers/dbController");
const router = express.Router();

router.get("/get-restaurants", getRestaurants);
router.post("/add-restaurant", addRestaurant);

module.exports = router;