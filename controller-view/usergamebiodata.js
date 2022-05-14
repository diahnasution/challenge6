const { user_game_biodata } = require('../models');
const moment = require('moment');

module.exports = {
  getAllUserGame: (req, res) => {
    user_game_biodata.findAll({
      attributes: ['id','nama', 'email', 'gender', 'createdAt', 'updatedAt'],
    })
      .then((result) => {
        if (result.length > 0) {
          // res.status(200).json({ message: 'Berhasil Get All User Game', result });
          res.render('usergamebiodata/index', { usergamebiodata: result, moment, page_name: 'usergamebiodata'});
        } else {
          // res.status(404).json({ message: 'User Game Tidak di temukan', result });
          res.render('usergamebiodata/index', { usergamebiodata: result, moment, page_name: 'usergamebiodata' });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Get All User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  getUserGameById: (req, res) => {
    user_game_biodata.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'nama', 'email', 'gender', 'createdAt', 'updatedAt'],
    })  
      .then((result) => {
        if (result) {
          // res.status(200).json({ message: 'Berhasil Get User Game By Id', result });
          res.render('usergamebiodata/update', { usergamebiodata: result, page_name: 'usergamebiodata' });
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
    res.render('usergamebiodata/create');
  },
  createUserGame: async (req, res) => {
    user_game_biodata.create({
      nama: req.body.nama,
      email: req.body.email,
      gender: req.body.gender,
    })
      .then((result) => {
        res.redirect('/view/usergamebiodata');
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Membuat User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  updateUserGame: async (req, res) => {
    const { username, password } = req.body;
    user_game_biodata.update(
      {
        nama: req.body.nama,
        email: req.body.email,
        gender: req.body.gender,
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
          res.redirect('/view/usergamebiodata');
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Mengupdate User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  deleteUserGame: (req, res) => {
    user_game_biodata.destroy({
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
          res.redirect('/view/usergamebiodata/');
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Menghapus User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
};
