import app from '../index';
import supertest from 'supertest';

const request = supertest(app);
// Test endpoints on images route
describe('Test endpoint responses' as string, (): void => {
  it('gets the api endpoint' as string, async (): Promise<void> => {
    const response = await request
      .get('/images')
      // gets the params of the url in testing
      .query({ filename: 'fjord', width: 200, height: 200 });
    expect(response.status).toBe(200);
  });
  it('should catch error in response' as string, async (): Promise<void> => {
    const errResponse = await request
      .get('/images')
      .query({ filename: 'ord', width: 200, height: 200 });
    // expect to fail
    expect(errResponse.status).toBe(500);
  });
});
