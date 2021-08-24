const { checkPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User, Fish, Wishlist } = require("../models")
const fs = require("fs")


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
                        imageUrl = el["Image Gallery"][0].src
                    } catch (err) {
                        imageUrl = ""
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
        console.log(req)
        try {
            
        } catch (err) {
            
        }
    }

    static async getWishlist(req, res, next) {
        try {
            
        } catch (err) {
            
        }
    }

    static async deleteFish(req, res, next) {
        try {
            
        } catch (err) {
            
        }
    }
}

module.exports = Controller