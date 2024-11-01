import request from 'supertest';
import app from '../';
import pool from '../db';

jest.mock('../db');

describe('Express Server', () => {
  afterAll(async () => {
    await pool.end();
  });

  describe('GET /', () => {
    it('should return a welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello, TypeScript with Express!');
    });
  });

  describe('GET /test-db', () => {
    it('should return the current time from the database', async () => {
      const mockCurrentTime = [{ now: new Date().toISOString() }];
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockCurrentTime });

      const response = await request(app).get('/test-db');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCurrentTime);
    });

    // it('should return a 500 error if there is a database error', async () => {
    //   (pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database query error'));

    //   const response = await request(app).get('/test-db');

    //   expect(response.status).toBe(500);
    //   expect(response.text).toBe('Database query error');
    // });
  });
});
