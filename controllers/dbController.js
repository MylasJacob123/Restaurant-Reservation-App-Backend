const restaurant = require("../models/restaurant");
const reservation = require("../models/reservation");

// RESTAURANT FUNCTIONS
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurant.find().populate("admin");
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, description, reservationSlots, admin } =
      req.body;

    if (!name || !location || !cuisine || !admin) {
      return res
        .status(400)
        .json({ error: "Name, location, cuisine, and admin are required." });
    }

    const newRestaurant = new restaurant({
      name,
      location,
      cuisine,
      description,
      reservationSlots,
      admin,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, cuisine, description, reservationSlots, admin } =
      req.body;

    const restaurantToUpdate = await restaurant.findById(id);
    if (!restaurantToUpdate) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (name) restaurantToUpdate.name = name;
    if (location) restaurantToUpdate.location = location;
    if (cuisine) restaurantToUpdate.cuisine = cuisine;
    if (description) restaurantToUpdate.description = description;
    if (reservationSlots)
      restaurantToUpdate.reservationSlots = reservationSlots;
    if (admin) restaurantToUpdate.admin = admin;

    const updatedRestaurant = await restaurantToUpdate.save();
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRestaurant = await restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res
      .status(200)
      .json({ message: "Restaurant deleted successfully", deletedRestaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// RESERVATION FUNCTIONS
const getReservations = async (req, res) => {
  try {
    const reservations = await reservation
      .find()
      .populate("user")
      .populate("restaurant");

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addReservation = async (req, res) => {
    try {
      const { user, restaurant: restaurantId, date, status } = req.body;
  
      if (!user || !restaurantId || !date) {
        return res
          .status(400)
          .json({ error: "User, restaurant, and date are required." });
      }
  
      console.log(restaurantId);
  
      const foundRestaurant = await restaurant.findById(restaurantId);  
      if (!foundRestaurant) {
        return res.status(404).json({ error: "Restaurant not found." });
      }
  
      const newReservation = new reservation({
        user,
        restaurant: restaurantId, 
        date,
        status: status || "pending",
      });
  
      const savedReservation = await newReservation.save();
      res.status(201).json(savedReservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
  getRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getReservations,
  addReservation
};
