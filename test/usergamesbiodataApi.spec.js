/** @format */

const { user_game_biodata , sequelize} = require('../models');
const { QueryTypes } = require('sequelize');
require('../controllers/user-game-biodata-controller');
const request = require('supertest');
const app = require('../app');
const { Query } = require('pg');

describe('User Game Biodata API Controller Testing', () => {
  beforeAll(async () => {
    await request(app).post('/api/register').send({ username: 'diahnas',  password: 'diahnas' });
    const login = await request(app).post('/api/login').send({ username: 'diahnas', password: 'diahnas' });
    token = login.body.token;
  });

  afterAll(async () => {
    try {
      await user_game_biodata.query('TRUNCATE user_game, user_game_bidata user_game_history RESTART INDENTY', {type: QueryTypes} );
    } catch (error) {
      console.log(error)
    }
    
  });

  test('Mengambil data kosong', async () => {
    const { statusCode, error } = await request(app).get('/api/user-game-biodata');
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual('A token is required for authentication');
  });


  test('Create User Games Data Biodata ', async () => {
    const { body, statusCode } = await request(app)
      .post('/api/user-game-biodata')
      .set({ Authorization: token })
      .send({ nama: 'Rodiah Akhfani Nasution',  email: 'Diah@gmail.com', gender: 'Perempuan' });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual('Berhasil Membuat User Game');
    expect(body.result.nama).toEqual('Rodiah Akhfani Nasution');
    expect(body.result.email).toEqual('Diah@gmail.com');
    expect(body.result.gender).toEqual('Perempuan');
  });

  test('Mengambil 1  User Game Biodata', async () => {
    const { body, statusCode } = await request(app).get('/api/user-game-biodata/1').set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual('Valid Get User Game By Id');
    expect(body.result.nama).toEqual('Rodiah Akhfani Nasution');
    expect(body.result.email).toEqual('Diah@gmail.com');
    expect(body.result.gender).toEqual('Perempuan');
  });

  test('User Game Biodata ID Tidak Ada', async () => {
    const { body, statusCode } = await request(app).get('/api/user-game-biodata/100').set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game dengan ID 100 Tidak di temukan');
  });

  test('Delete user game biodata yang idnya tidak ada', async () => {
    const { body, statusCode } = await request(app).delete('/api/user-game-biodata-delete/100').set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game dengan ID 100 Not Found');
    expect(body.result).toEqual(0);
  }); 

});
