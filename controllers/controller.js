const axios = require("axios");
const nodemailer = require("nodemailer");

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

    static sendEmail(req, res, next) {
        try {
            const {
                email
            } = req.body;

            const emailSender = process.env.EMAIL;
            const passSender = process.env.EMAIL_PASSWORD;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: emailSender,
                    pass: passSender
                }
            });

            const mailOptions = {
                from: emailSender,
                to: email,
                subject: 'info from Kebunku admin',
                text: 'your request already process'
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw (err);
                res.status(200).json(info.response)
            });


        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller;