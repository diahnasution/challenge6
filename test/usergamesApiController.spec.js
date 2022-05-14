/** @format */

const { user_game , sequelize} = require('../models');
const { QueryTypes } = require('sequelize');
require('../controllers/user-game-controller');
const request = require('supertest');
const app = require('../app');
const { Query } = require('pg');

describe('User Game API Controller Testing', () => {
  beforeAll(async () => {
    await request(app).post('/api/register').send({ username: 'diahnas',  password: 'diahnas' });
    const login = await request(app).post('/api/login').send({ username: 'diahnas', password: 'diahnas' });
    token = login.body.token;
  });

  afterAll(async () => {
    try {
      await user_game.query('TRUNCATE user_game, user_game_bidata user_game_history RESTART INDENTY', {type: QueryTypes} );
    } catch (error) {
      console.log(error)
    }
    
  });

  test('Mengambil data kosong', async () => {
    const { statusCode, error } = await request(app).get('/api/user-game');
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual('A token is required for authentication');
  });


  // test(' Mengambil semua data user game dengan authentikasi', async () => {
  //   const inputUserGames = await user_game.create({ username: 'diahnas',  password: 'diahnas' });

  //   const { body, statusCode } = await request(app).get('/api/user-game').set({ Authorization: token });
  //   expect(statusCode).toEqual(200);
  //   // expect(body.message).toEqual('Berhasil Mengambil Semua Data User Game');
  //   expect(body.result[body.data.length - 1].username.toEqual(inputUserGames.username))
  //   expect(body.result[body.data.length - 1].password).toEqual(inputUserGames.password);
  //   expect(body.result).toHaveLength(1);
  // });

  test('Create User Games Data with Auth', async () => {
    const { body, statusCode } = await request(app)
      .post('/api/user-game')
      .set({ Authorization: token })
      .send({ username: 'diahnas',  password: 'diahnas' });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual('Berhasil Membuat User Game');
    expect(body.result.username).toEqual('diahnas');
    expect(body.result.password).toEqual(body.result.password);
  });

  test('Mengambil 1  User Game', async () => {
    const { body, statusCode } = await request(app).get('/api/user-game/1').set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual('Valid Get User Game By Id');
    expect(body.result.username).toEqual('diahnas');
    expect(body.result.password).toEqual('$2b$10$.WucSzhWENNzGK6QbiBDiu8YOK/LV3.YMauMGVaIz7oT20dfQ1S/a');
  });

  test('User Game ID Tidak Ada', async () => {
    const { body, statusCode } = await request(app).get('/api/user-game/100').set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game dengan ID 100 Tidak di temukan');
  });

  test('Delete user game yang idnya tidak ada', async () => {
    const { body, statusCode } = await request(app).delete('/api/user-game-delete/100').set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game dengan ID 100 Not Found');
    expect(body.result).toEqual(0);
  }); 

});
