const axios = require("axios");

class Controller {
    static async getWeatherApi(req, res, next) {
        try {
            const {
                location
            } = req.body;
            const privateKey = process.env.WEATHER_KEY

            const result = await axios.get("http://api.weatherapi.com/v1/current.json", {
                params: {
                    key: privateKey,
                    q: location,
                    aqi: 'no'
                }
            })

            res.status(200).json(result.data.current)

        } catch (err) {
            res.send(err)
        }
    }

}

module.exports = Controller;