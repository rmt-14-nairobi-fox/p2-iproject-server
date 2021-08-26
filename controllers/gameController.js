const { User, Score, Letter, OnlineUser } = require("../models");
const { anagram } = require("../helpers/anagram");
const { dictionary } = require("../helpers/dictionary");
const { Op } = require("sequelize");
const { generateToken } = require("../helpers/jwt");
const { randomLetters } = require("../helpers/randomLetters");

class GameController {
  static getHome(req, res, next) {
    res.status(200).json({ message: "Welcome to WApp" });
  }

  static joinUser(req, res, next) {
    const { player, playerLocation } = req.body;
    let username = player;
    let location = playerLocation;
    if (player == "Guest") {
      username = "Guest" + Math.round(+new Date() / 1000);
    }
    if (playerLocation == "" || typeof playerLocation == "undefined") {
      location = "Jakarta";
    }
    const newUser = {
      username,
      location,
    };
    User.findOrCreate({ where: newUser })
      .then((result) => {
        const token = generateToken({ id: result[0].id, username: result[0].username });
        res.status(201).json({ token, id: result[0].id, username: result[0].username });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getWords(req, res, next) {
    const { level } = req.query;
    let words = [];
    let letters = randomLetters(level);
    anagram(letters)
      .then((result) => {
        words = result.filter((el) => el.length > 2);
        if (words.length === 0) {
          letters = randomLetters(level);
          return anagram(letters);
        } else {
          res.status(200).json({ letters, words });
        }
      })
      .then((result) => {
        words = result.filter((el) => el.length > 2);
        if (words.length === 0) {
          letters = randomLetters(level);
          return anagram(letters);
        } else {
          res.status(200).json({ letters, words });
        }
      })
      .then((result) => {
        words = result.filter((el) => el.length > 2);
        if (words.length === 0) {
          letters = randomLetters(level);
          return anagram(letters);
        } else {
          res.status(200).json({ letters, words });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static checkWord(req, res, next) {
    const { word } = req.body;
    let definition;
    dictionary(word)
      .then((result) => {
        if (result.valid) {
          definition = result;
          const toCheck = result.word.split("").map((el) => el.toUpperCase());
          return Letter.findAll({
            where: {
              letter: {
                [Op.or]: toCheck,
              },
            },
          });
        } else {
          next({
            name: "InvalidWord",
            message: "Word is not defined",
          });
        }
      })
      .then((result) => {
        let totalScore = 0;
        result.forEach((el) => {
          totalScore += +el.score;
        });
        res.status(200).json({ definition: definition.definition, totalScore });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTopScorer(req, res, next) {
    Score.findAll({
      include: [User],
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        next(err);
      });
  }

  static logoutUser(req, res, next) {
    const { id } = req.params;
    const value = {
      isLoggedIn: false,
    };
    const option = {
      where: { id: +id },
    };
    User.update(value, option)
      .then(() => {
        res.status(200).json({ message: "User log out" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getUsers(req, res, next) {
    User.findAll()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        next(err);
      });
  }

  static onlineUser(req, res, next) {
    OnlineUser.create();
  }

  static saveScore(req, res, next) {
    const { id } = req.user;
    const { score, level } = req.body;
    const newScore = {
      UserId: +id,
      score: +score,
      level: +level,
    };
    Score.create(newScore)
      .then((result) => {
        res.status(200).json({ message: "New Scorer is recorded" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = GameController;
