import app from '../index';
import supertest from 'supertest';

const request = supertest(app);
// Test endpoints on images route
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request
      .get('/images')
      // gets the params of the url in testing
      .query({ filename: 'fjord', width: 200, height: 200 });
    expect(response.status).toBe(200);
  });
  it('should catch error in response', async () => {
    const errResponse = await request
      .get('/images')
      .query({ filename: 'ord', width: 200, height: 200 });
    // expect to fail
    expect(errResponse.status).toBe(500);
  });
});
