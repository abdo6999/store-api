import * as supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test gallery responses', () => {
  it('gets the gallery endpoint', async () => {
    const response = await request.get('/gallery');
    expect(response.status).toBe(200);
  });
  it('gets the gallery image with invalid query endpoint', async () => {
    const response = await request.get(
      '/gallery/images?filename=erfall.jpg&width=1920&height=1273'
    );
    expect(response.status).toBe(418);
  });
  it('gets the gallery image with valid query endpoint', async () => {
    const response = await request.get(
      '/gallery/images?filename=icelandwaterfall.jpg&width=1920&height=1273'
    );
    expect(response.status).toBe(200);
  });
});
