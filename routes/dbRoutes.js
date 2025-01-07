const express = require("express");
const { getRestaurants } = require("../controllers/dbController");
const router = express.Router();

router.get("/get-restaurants", getRestaurants);

module.exports = router;