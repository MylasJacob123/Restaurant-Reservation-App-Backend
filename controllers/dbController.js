const restaurant = require("../models/restaurant");

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
        const { name, location, cuisine, description, reservationSlots, admin } = req.body;

        if (!name || !location || !cuisine || !admin) {
            return res.status(400).json({ error: "Name, location, cuisine, and admin are required." });
        }

        const newRestaurant = new restaurant({
            name,
            location,
            cuisine,
            description,
            reservationSlots,
            admin
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
        const { name, location, cuisine, description, reservationSlots, admin } = req.body;

        const restaurantToUpdate = await restaurant.findById(id);
        if (!restaurantToUpdate) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        if (name) restaurantToUpdate.name = name;
        if (location) restaurantToUpdate.location = location;
        if (cuisine) restaurantToUpdate.cuisine = cuisine;
        if (description) restaurantToUpdate.description = description;
        if (reservationSlots) restaurantToUpdate.reservationSlots = reservationSlots;
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

        res.status(200).json({ message: "Restaurant deleted successfully", deletedRestaurant });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant };