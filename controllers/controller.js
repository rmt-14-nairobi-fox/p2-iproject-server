const { checkPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User, Fish, Wishlist } = require("../models")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// const axios = require("axios")


class Controller {

    static async register(req, res, next) {
        console.log(req.body)
        const { email, password } = req.body
        try {
            const result = await User.create({
                email,
                password
            })
            res.status(201).json(result)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const result = await User.findOne({where: {email}})
            if (result) {
                if(checkPassword(password, result.password)) {
                    const access_token = signToken({
                        id: result.id,
                        email: result.email
                    })
                    res.status(200).json({
                        result,
                        access_token
                    })
                } else {
                    throw ({ name: "Fail Login" })
                }
            } else {
                throw ({ name: "Fail Login" })
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            // const client = new OAuth2Client("241740990990-t9lc9d7bo3uaa2s6kehsfliebnpasdfq.apps.googleusercontent.com")
            console.log(req.body)   
            const ticket = await client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT
        })
            const { email, picture, at_hash } = ticket.getPayload()
            // console.log(ticket.getPayload());
            // console.log(name, "======================ini name");
            // console.log(email);
            // console.log(picture);
            const [user] = await User.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    email: email,
                    password: at_hash,
                }
            })
        if (user) {
            const access_token = signToken({
                id: user.id,
                email: user.email,
            })
            res.status(200).json({access_token, id: user.id, email: user.email})
        } else {
            throw ({message: "Not Found"})
        }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async getFishes(req, res, next) {
        try {
            var http = require('https');

            //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
            var options = {
                host: 'www.fishwatch.gov',
                path: '/api/species'
            };

            let callback = function(response) {
                // console.log(response)
                var str = '';

            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been received, so we just print it out here
            response.on('end', function () {
                const result = JSON.parse(str)
                // console.log(result);
                const fishes = result.map((el, index) => {
                    let imageUrl
                    try {
                        imageUrl = el["Species Illustration Photo"].src
                    } catch (err) {
                        imageUrl = "Not Available"
                    }
                    return Fish.build({
                        id: index,
                        name: el["Species Name"],
                        population: el.Population,
                        status: el["Population Status"],
                        availability: el["Availability"],
                        fishingRate: el["Fishing Rate"],
                        imageUrl: imageUrl
                    })
                })
                console.log(fishes)
                res.status(200).json(fishes)
            });
            }
            http.request(options, callback).end();
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async getFishById(req, res, next) {
        console.log(req.params.fishName)
        const fishName = req.params.fishName.split(" ").join("-")
        console.log(fishName)
        try {
            var http = require('https');

            //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
            var options = {
                host: 'www.fishwatch.gov',
                path: `/api/species/${fishName}`
            };

            let callback = function(response) {
                // console.log(response)
                var str = '';

            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been received, so we just print it out here
            response.on('end', function () {
                const result = JSON.parse(str)
                // console.log(result);
                const fishes = result.map((el, index) => {
                    let imageUrl
                    try {
                        imageUrl = el["Species Illustration Photo"].src
                    } catch (err) {
                        imageUrl = "Not Available"
                    }
                    return Fish.build({
                        id: index,
                        name: el["Species Name"],
                        population: el.Population,
                        status: el["Population Status"],
                        availability: el["Availability"],
                        fishingRate: el["Fishing Rate"],
                        imageUrl: imageUrl
                    })
                })
                console.log(fishes)
                res.status(200).json(fishes)
            });
            }
            http.request(options, callback).end();
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async addFish(req, res, next) {
        console.log(req.user)
        console.log(req.params.fishName)
        const fishName = req.params.fishName.split(" ").join("-")
        console.log(fishName)
        try {
            const response = await Wishlist.create({
                UserId: req.user.id,
                fishName: fishName
            })
            console.log(response)
            res.status(201).json(response)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async getWishlist(req, res, next) {
        console.log(req.user)
        try {
            const response = await Wishlist.findAll({where:{UserId: req.user.id}})
            console.log(response)
            res.status(200).json(response)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async deleteFish(req, res, next) {
        console.log(req.user)
        const fishName = req.params.fishName.split(" ").join("-")
        console.log(fishName)
        try {
            const response = await Wishlist.destroy(
                {
                    where: {
                        fishName: fishName,
                        UserId: req.user.id
            }})
            console.log(response)
            res.status(200).json({message: `Fish with name ${fishName} has been deleted`})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = Controller