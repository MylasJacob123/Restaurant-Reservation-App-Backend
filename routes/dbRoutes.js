const express = require("express");
const { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant } = require("../controllers/dbController");
const router = express.Router();

router.get("/get-restaurants", getRestaurants);
router.post("/add-restaurant", addRestaurant);
router.put("/update-restaurant/:id", updateRestaurant);
router.delete("/delete-restaurant/:id", deleteRestaurant);

module.exports = router;