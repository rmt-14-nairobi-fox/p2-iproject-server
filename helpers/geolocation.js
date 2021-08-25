const axios = require("axios");

module.exports = geoLocation = async (req, res, next) => {
  try {
    const ip = req.body.ip;
    const data = await axios.get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=0e07a9ff5dbc44019a9f926aa9432a1a&ip_address=${ip}`
    );

    const { latitude, longitude } = data.data;
    req.location = { latitude, longitude };

    next();
  } catch (err) {
    console.log(err);
  }
};
