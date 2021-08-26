const axios = require("axios");

async function geocode(address) {
  try {
    const getLocation = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${process.env.MAPBOX_API}&limit=1`
    );

    return {
      placeName: getLocation.data.features[0].place_name,
      latitude: getLocation.data.features[0].center[1],
      longitude: getLocation.data.features[0].center[0],
    };
  } catch (err) {
    throw new Error();
  }
}

module.exports = { geocode };
