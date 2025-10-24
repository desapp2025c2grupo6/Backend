const request = require('supertest');

const BASE_URL = 'http://localhost:3001';

describe('Afiliados API', () => {
  test('GET /afiliados returns seeded afiliados', async () => {
    const res = await request(BASE_URL).get('/afiliados');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    // We seeded 2 afiliados in the seeder
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });

  test('POST /afiliados creates a new afiliado (happy path)', async () => {
    const payload = {
      tipoDocumento: 'DNI',
      nroDocumento: `TST${Date.now()}`,
      nombre: 'Test',
      apellido: 'User',
      fechaNacimiento: '1995-01-01',
    };

    const res = await request(BASE_URL).post('/afiliados').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBeGreaterThan(0);
    expect(res.body.data.nombre).toBe(payload.nombre);
  });

  test('POST /afiliados returns 400 on invalid payload', async () => {
    const payload = { nombre: 'Incomplete' };
    const res = await request(BASE_URL).post('/afiliados').send(payload);
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(Array.isArray(res.body.errors)).toBe(true);
  });
});
