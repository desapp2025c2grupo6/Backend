import createSchema from '../schemas/afiliadosSchema.js';

// Joi-based validators for Afiliados (keeps old file untouched to avoid merge problems)

function isPositiveInteger(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (id === undefined)
    return res.status(400).json({ message: 'Falta parámetro id' });
  if (!isPositiveInteger(id))
    return res
      .status(400)
      .json({ message: 'El id debe ser un entero positivo' });
  next();
}

function mapJoiErrors(err) {
  if (!err || !err.details) return [];
  return err.details.map((d) => d.message.replace(/"/g, ''));
}

function validateCreateBody(req, res, next) {
  const body = req.body || {};
  const { error } = createSchema.validate(body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error)
    return res
      .status(400)
      .json({ message: 'Datos inválidos', errors: mapJoiErrors(error) });
  next();
}

function validateUpdateBody(req, res, next) {
  const body = req.body || {};
  const keys = Object.keys(
    (createSchema && createSchema.describe && createSchema.describe().keys) ||
      {}
  );
  let updateSchema = createSchema;
  if (keys.length) updateSchema = createSchema.fork(keys, (s) => s.optional());
  const { error } = updateSchema.validate(body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error)
    return res
      .status(400)
      .json({ message: 'Datos inválidos', errors: mapJoiErrors(error) });
  next();
}

export { validateIdParam, validateCreateBody, validateUpdateBody };
