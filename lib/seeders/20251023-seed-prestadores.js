import db from '../models';

async function seedPrestadores() {
  const { Prestador } = db;
  const count = await Prestador.count();
  if (count > 0) {
    console.log('Prestadors table already seeded.');
    return;
  }

  const prestadores = [
    {
      nombre: 'Carlos',
      apellido: 'Ramirez',
      CUIT: '20-12345678-9',
      especialidad: 'Cardiología',
      diasAtencion: 'Lunes a Viernes',
      horarioAtencion: '09:00-17:00',
    },
    {
      nombre: 'Lucía',
      apellido: 'Fernández',
      CUIT: '27-87654321-0',
      especialidad: 'Pediatría',
      diasAtencion: 'Martes y Jueves',
      horarioAtencion: '10:00-16:00',
    },
  ];

  await Prestador.bulkCreate(prestadores);
  console.log('Seeded prestadores:', prestadores.length);
}

export default seedPrestadores;
