const { user_game } = require('../models');
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  getAllUserGame: (req, res) => {
    user_game.findAll({
      attributes: ['id','username', 'password', 'createdAt', 'updatedAt'],
    })
      .then((result) => {
        if (result.length > 0) {
          // res.status(200).json({ message: 'Berhasil Get All User Game', result });
          res.render('usergames/index', { usergames: result, moment, page_name: 'usergames'});
        } else {
          // res.status(404).json({ message: 'User Game Tidak di temukan', result });
          res.render('usergames/index', { usergames: result, moment, page_name: 'usergames' });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Get All User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  getUserGameById: (req, res) => {
    user_game.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'username',  'password', 'createdAt', 'updatedAt'],
    })  
      .then((result) => {
        if (result) {
          // res.status(200).json({ message: 'Berhasil Get User Game By Id', result });
          res.render('usergames/update', { usergame: result, page_name: 'usergames' });
        } else {
          res.status(404).json({ message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan', result });
          // res.render('error', { status: res.status(404), err: 'Data tidak ditemukan!' });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Get User Game By Id', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  createUserGameForm: (req, res) => {
    res.render('usergames/create');
  },
  createUserGame: async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user_game.create({
      username: req.body.username,
      password: hashedPassword,
    })
      .then((result) => {
        res.redirect('/view/usergames');
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Membuat User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  updateUserGame: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    user_game.update(
      {
        username: username,
        password: hashedPassword,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((result) => {
        if (result[0] === 0) {
          // res.status(404).json({
          //   message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan',
          //   result,
          // });
          res.render('error', { status: res.status(404), err: 'Data tidak ditemukan!' });
        } else {
          res.redirect('/view/usergames');
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Mengupdate User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  deleteUserGame: (req, res) => {
    user_game.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        if (result === 0) {
          // res.status(404).json({
          //   message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan',
          //   result,
          // });
          res.render('error', { status: res.status(404), err: 'Data tidak ditemukan!' });
        } else {
          // res.status(200).json({ message: 'Berhasil Menghapus User Game', result });
          res.redirect('/view/usergames');
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Menghapus User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
};
