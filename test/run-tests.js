const http = require('http');

const BASE = { hostname: 'localhost', port: 3001 };

function request(method, path, data) {
  const opts = {
    hostname: BASE.hostname,
    port: BASE.port,
    path,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(opts, (res) => {
      let raw = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        let body = null;
        try {
          body = raw ? JSON.parse(raw) : null;
        } catch (e) {
          // non-JSON body
          body = raw;
        }
        resolve({ status: res.statusCode, body });
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(retries = 20, interval = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await request('GET', '/afiliados');
      if (res.status === 200) return true;
    } catch (e) {
      // ignore
    }
    await delay(interval);
  }
  return false;
}

async function run() {
  console.log('Running integration tests against http://localhost:3001');

  const ready = await waitForServer(40, 250);
  if (!ready) {
    console.error('Server did not become ready in time');
    process.exit(1);
  }

  // 1) GET /afiliados
  const getRes = await request('GET', '/afiliados');
  if (getRes.status !== 200) {
    console.error('GET /afiliados failed', getRes);
    process.exit(1);
  }
  console.log(
    'GET /afiliados OK, count=',
    Array.isArray(getRes.body && getRes.body.data)
      ? getRes.body.data.length
      : 'N/A'
  );

  // 2) POST /afiliados (valid)
  const payload = {
    tipoDocumento: 'DNI',
    nroDocumento: `ITEST${Date.now()}`,
    nombre: 'ITest',
    apellido: 'Runner',
    fechaNacimiento: '1999-01-01',
  };
  const postRes = await request('POST', '/afiliados', payload);
  if (postRes.status !== 201) {
    console.error('POST /afiliados failed', postRes);
    process.exit(1);
  }
  console.log(
    'POST /afiliados OK id=',
    postRes.body && postRes.body.data && postRes.body.data.id
  );

  // 3) POST /afiliados invalid
  const invalidRes = await request('POST', '/afiliados', { nombre: 'Bad' });
  if (invalidRes.status !== 400) {
    console.error('POST /afiliados invalid did not return 400', invalidRes);
    process.exit(1);
  }
  console.log('POST /afiliados invalid OK');
  // 4) GET /afiliados/:id
  const createdId = postRes.body.data.id;
  const getByIdRes = await request('GET', `/afiliados/${createdId}`);
  if (getByIdRes.status !== 200) {
    console.error('GET /afiliados/:id failed', getByIdRes);
    process.exit(1);
  }
  console.log('GET /afiliados/:id OK id=', createdId);

  // 5) PUT /afiliados/:id (update nombre)
  const updatePayload = { nombre: 'ITestUpdated' };
  const putRes = await request('PUT', `/afiliados/${createdId}`, updatePayload);
  if (putRes.status !== 200) {
    console.error('PUT /afiliados/:id failed', putRes);
    process.exit(1);
  }
  console.log('PUT /afiliados/:id OK id=', createdId);

  // 6) DELETE /afiliados/:id
  const deleteRes = await request('DELETE', `/afiliados/${createdId}`);
  if (deleteRes.status !== 200 && deleteRes.status !== 204) {
    console.error('DELETE /afiliados/:id failed', deleteRes);
    process.exit(1);
  }
  console.log('DELETE /afiliados/:id OK id=', createdId);

  // 7) Verify deletion
  const verifyRes = await request('GET', `/afiliados/${createdId}`);
  if (verifyRes.status !== 404) {
    console.error('Deleted record still accessible', verifyRes);
    process.exit(1);
  }

  console.log('All integration tests passed');
  console.log('aplicacion corriendo en:  http://localhost:3001/afiliados');
  process.exit(0);
}

run().catch((err) => {
  console.error('Test run error', err);
  process.exit(1);
});
