const express = require("express");
const {
  getRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getReservations,
  addReservation,
  updateReservation,
  deleteReservation
} = require("../controllers/dbController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");
const router = express.Router();

// RESTAURANT ROUTES
router.get("/get-restaurants", getRestaurants);
router.post("/add-restaurant", protect, adminOnly,  addRestaurant);
router.put("/update-restaurant/:id", protect, adminOnly,  updateRestaurant);
router.delete("/delete-restaurant/:id", protect, adminOnly,  deleteRestaurant);

// RESERVATION ROUTES
router.get("/get-reservations", getReservations);
router.post("/add-reservation", protect, addReservation);
router.put("/update-reservation/:id", protect, updateReservation);
router.delete("/delete-reservation/:id", protect, deleteReservation);

module.exports = router;
