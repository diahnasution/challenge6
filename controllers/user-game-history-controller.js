const { user_game_history } = require("../models");
module.exports = {
  getuser_gamebio: (req, res, next) => {
    user_game_history
      .findAll({
        attributes: ["id", "login_time", "logout_time", "skor"],
      })
      .then((result) => {
        if (result.length > 0) {
          res
            .status(200)
            .json({ message: "Valid Get All User Game Biodata", data: result });
        } else {
          res
            .status(402)
            .json({ message: "User Game Not Found", data: result });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed Get All User Game", err: err.message });
      });
  },
  getuser_gamebyid: (req, res) => {
    user_game_history
      .findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "login_time", "logout_time", "skor"],
      })
      .then((result) => {
        if (result) {
          res
            .status(200)
            .json({ message: "Valid Get User Game By Id", result });
        } else {
          res.status(404).json({
            message:
              "User Game dengan ID " + req.params.id + " Tidak di temukan",
            result,
          });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "failed Get User Game By Id", err: err.message });
      });
  },
  createuser_game: (req, res) => {
    user_game_history
      .create({
        login_time: req.body.login_time,
        logout_time: req.body.logout_time,
        skor: req.body.skor,
      })
      .then((result) => {
        res.status(200).json({ message: "Valid Membuat User Game", result });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed Membuat User Game", err: err.message });
      });
  },
  update_user_game: (req, res) => {
    user_game_history
      .update(
        {
          login_time: req.body.login_time,
          logout_time: req.body.logout_time,
          skor: req.body.skor,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((result) => {
        if (result[0] === 0) {
          res.status(404).json({
            message: "User Game dengan ID " + req.params.id + " Not Found",
            result,
          });
        } else {
          res
            .status(200)
            .json({ message: "Valid Mengupdate User Game", result });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed Mengupdate User Game", err: err.message });
      });
  },
  deleteuser_game: (req, res) => {
    user_game_history
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result === 0) {
          res
            .status(404)
            .json({
              message: "User Game dengan ID " + req.params.id + " Not Found",
              result,
            });
        } else {
          res
            .status(200)
            .json({ message: "Valid Menghapus User Game", result });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed Menghapus User Game", err: err.message });
      });
  },
};
