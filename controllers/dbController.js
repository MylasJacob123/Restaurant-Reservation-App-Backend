const restaurant = require("../models/restaurant");

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurant.find().populate("admin");
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getRestaurants };