const axios = require("axios");

async function weather(address) {
  try {
    const getWeather = await axios.get(
      `http://api.weatherstack.com/current?access_key=${
        process.env.WEATHER_STACK_API
      }&query=${+address.lat},${+address.long}`
    );

    return {
      localtime: getWeather.data.location.localtime,
      temperature: getWeather.data.current.temperature,
      weather_desc: getWeather.data.current.weather_descriptions[0],
    };
  } catch (err) {
    throw new Error();
  }
}

module.exports = { weather };
