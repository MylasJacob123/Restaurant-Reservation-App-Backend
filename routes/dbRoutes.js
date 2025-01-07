const express = require("express");
const { getRestaurants, addRestaurant, updateRestaurant } = require("../controllers/dbController");
const router = express.Router();

router.get("/get-restaurants", getRestaurants);
router.post("/add-restaurant", addRestaurant);
router.put("/update-restaurant", addRestaurant);

module.exports = router;