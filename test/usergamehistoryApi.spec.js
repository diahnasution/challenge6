/** @format */

const { user_game_history , sequelize} = require('../models');
const { QueryTypes } = require('sequelize');
require('../controllers/user-game-history-controller');
const request = require('supertest');
const app = require('../app');
const { Query } = require('pg');

describe('User Game History API Controller Testing', () => {
  beforeAll(async () => {
    await request(app).post('/api/register').send({ username: 'diahnas',  password: 'diahnas' });
    const login = await request(app).post('/api/login').send({ username: 'diahnas', password: 'diahnas' });
    token = login.body.token;
  });

  afterAll(async () => {
    try {
      await user_game_history.query('TRUNCATE user_game, user_game_bidata user_game_history RESTART INDENTY', {type: QueryTypes} );
    } catch (error) {
      console.log(error)
    }
    
  });

  test('Mengambil data kosong', async () => {
    const { statusCode, error } = await request(app).get('/api/user-game-history');
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual('A token is required for authentication');
  });


//   test('Create User Games Data History ', async () => {
//     const { body, statusCode } = await request(app)
//       .post('/api/user-game-history')
//       .set({ Authorization: token })
//       .send({ login_time: '2022-05-05T13:16:00.000Z',  logout_time: '2022-02-09T04:22:11.000Z', skor: '100' });
//     expect(statusCode).toEqual(200);
//     expect(body.message).toEqual('Valid Membuat User Game');
//     expect(body.data.login_time).toEqual('2022-05-05T13:16:00.000Z');
//     expect(body.data.logout_time).toEqual('2022-02-09T04:22:11.000Z');
//     expect(body.data.skor).toEqual(100);
//   });

//   test('Mengambil 1  User Game History', async () => {
//     const { body, statusCode } = await request(app).get('/api/user-game-history/1').set({ Authorization: token });
//     expect(statusCode).toEqual(200);
//     expect(body.message).toEqual('Valid Get User Game By Id');
//     expect(body.result.login_time).toEqual('2022-02-09T04:22:11.000Z');
//     expect(body.result.logout_time).toEqual('2022-02-09T04:22:11.000Z');
//     expect(body.result.skor).toEqual('1;00')
//   });

test('Mengambil 1 data history', async () => {
    const { body, statusCode } = await request(app).get('/api/user-game-history/1').set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual('Valid Get User Game By Id');
    expect(body.data.login_time).toEqual('2022-05-05T13:16:00.000Z');
    expect(body.data.logout_time).toEqual('2022-02-09T04:22:11.000Z');
    expect(body.result.skor).toEqual(100);
  });

  test('User Game History ID Tidak Ada', async () => {
    const { body, statusCode } = await request(app).get('/api/user-game-history/100').set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game dengan ID 100 Tidak di temukan');
  });

  test('Delete user game history yang idnya tidak ada', async () => {
    const { body, statusCode } = await request(app).delete('/api/user-game-history-delete/100').set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game dengan ID 100 Not Found');
    expect(body.result).toEqual(0);
  }); 

});
