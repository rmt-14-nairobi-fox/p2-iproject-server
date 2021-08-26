const axios = require("axios");

module.exports = geoLocation = async (req, res, next) => {
  try {
    if (!req.body.ip) throw { code: 400, name: "No Ip" };
    const ip = req.body.ip;
    const data = await axios.get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.GEO_LOC_API_KEY}&ip_address=${ip}`
    );

    const { latitude, longitude } = data.data;
    req.location = { latitude, longitude };

    next();
  } catch (err) {
    next(err);
  }
};
