import db from '../models';

async function seedAffiliados() {
  const { Afiliado } = db;
  const count = await Afiliado.count();
  if (count > 0) {
    console.log('Affiliados table already seeded.');
    return;
  }

  const afiliados = [
    {
      tipoDocumento: 'DNI',
      nroDocumento: '12345678',
      nombre: 'Juan',
      apellido: 'Pérez',
      fechaNacimiento: '1985-06-15',
    },
    {
      tipoDocumento: 'DNI',
      nroDocumento: '87654321',
      nombre: 'María',
      apellido: 'Gómez',
      fechaNacimiento: '1990-09-20',
    },
  ];

  await Afiliado.bulkCreate(afiliados);
  console.log('Seeded afiliados:', afiliados.length);
}

export default seedAffiliados;
