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

module.exports = { getRestaurants, addRestaurant };