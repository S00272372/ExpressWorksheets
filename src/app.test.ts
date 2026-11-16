import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from './app';

describe('CORS middleware', () => {
  it('adds the CORS allow-origin header to responses', async () => {
    const response = await request(app).get('/ping');

    expect(response.headers['access-control-allow-origin']).toBe('*');
  });
});

describe('Validation errors', () => {
  it('returns structured validation details for an invalid body', async () => {
    const response = await request(app)
      .post('/cars')
      .set('x-api-key', 'test-key')
      .send({ make: '', model: '' });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Validation failed'
    });
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it('validates route params before the controller runs', async () => {
    const response = await request(app).get('/cars/not-a-valid-object-id');

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Validation failed'
    });
  });
});
