const express = require("express");
const { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant, getReservations, addReservation } = require("../controllers/dbController");
const router = express.Router();

// RESTAURANT ROUTES
router.get("/get-restaurants", getRestaurants);
router.post("/add-restaurant", addRestaurant);
router.put("/update-restaurant/:id", updateRestaurant);
router.delete("/delete-restaurant/:id", deleteRestaurant);

// RESERVATION ROUTES
router.get("/get-reservations", getReservations);
router.post("/add-reservation", addReservation);

module.exports = router;