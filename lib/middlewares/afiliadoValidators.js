// Middlewares de validación para rutas de Afiliado
function isPositiveInteger(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (id === undefined) {
    return res.status(400).json({ message: 'Falta parámetro id' });
  }
  if (!isPositiveInteger(id)) {
    return res
      .status(400)
      .json({ message: 'El id debe ser un entero positivo' });
  }
  next();
}

function validateDateString(dateStr) {
  // Acepta YYYY-MM-DD
  if (typeof dateStr !== 'string') return false;
  // simple regex check
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const d = new Date(dateStr);
  return !Number.isNaN(d.getTime());
}

function validateCreateBody(req, res, next) {
  const {
    tipoDocumento,
    nroDocumento,
    nombre,
    apellido,
    fechaNacimiento,
    grupoFamiliarId,
    planMedicoId,
  } = req.body || {};

  const errors = [];

  if (!tipoDocumento || typeof tipoDocumento !== 'string') {
    errors.push('tipoDocumento es requerido y debe ser string');
  }
  if (!nroDocumento || typeof nroDocumento !== 'string') {
    errors.push('nroDocumento es requerido y debe ser string');
  }
  if (!nombre || typeof nombre !== 'string') {
    errors.push('nombre es requerido y debe ser string');
  }
  if (!apellido || typeof apellido !== 'string') {
    errors.push('apellido es requerido y debe ser string');
  }
  if (!fechaNacimiento || !validateDateString(fechaNacimiento)) {
    errors.push('fechaNacimiento es requerido y debe tener formato YYYY-MM-DD');
  }

  if (grupoFamiliarId !== undefined && !isPositiveInteger(grupoFamiliarId)) {
    errors.push('grupoFamiliarId, si se provee, debe ser un entero positivo');
  }
  if (planMedicoId !== undefined && !isPositiveInteger(planMedicoId)) {
    errors.push('planMedicoId, si se provee, debe ser un entero positivo');
  }

  if (errors.length) {
    return res.status(400).json({ message: 'Datos inválidos', errors });
  }
  next();
}

function validateUpdateBody(req, res, next) {
  const {
    tipoDocumento,
    nroDocumento,
    nombre,
    apellido,
    fechaNacimiento,
    grupoFamiliarId,
    planMedicoId,
  } = req.body || {};

  const errors = [];

  if (tipoDocumento !== undefined && typeof tipoDocumento !== 'string') {
    errors.push('tipoDocumento debe ser string');
  }
  if (nroDocumento !== undefined && typeof nroDocumento !== 'string') {
    errors.push('nroDocumento debe ser string');
  }
  if (nombre !== undefined && typeof nombre !== 'string') {
    errors.push('nombre debe ser string');
  }
  if (apellido !== undefined && typeof apellido !== 'string') {
    errors.push('apellido debe ser string');
  }
  if (fechaNacimiento !== undefined && !validateDateString(fechaNacimiento)) {
    errors.push('fechaNacimiento debe tener formato YYYY-MM-DD');
  }
  if (grupoFamiliarId !== undefined && !isPositiveInteger(grupoFamiliarId)) {
    errors.push('grupoFamiliarId debe ser un entero positivo');
  }
  if (planMedicoId !== undefined && !isPositiveInteger(planMedicoId)) {
    errors.push('planMedicoId debe ser un entero positivo');
  }

  if (errors.length) {
    return res.status(400).json({ message: 'Datos inválidos', errors });
  }
  next();
}

export { validateIdParam, validateCreateBody, validateUpdateBody };
