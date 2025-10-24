const Joi = require('joi');

// Schema for creating an Afiliado. Update operations will use a variant with all
// fields optional.
const createSchema = Joi.object({
  tipoDocumento: Joi.string().min(1).max(20).required().messages({
    'string.base': '"tipoDocumento" debe ser un texto',
    'string.empty': '"tipoDocumento" no puede estar vacío',
    'any.required': '"tipoDocumento" es un campo obligatorio',
  }),
  nroDocumento: Joi.string().min(1).max(20).required().messages({
    'string.base': '"nroDocumento" debe ser un texto',
    'string.empty': '"nroDocumento" no puede estar vacío',
    'any.required': '"nroDocumento" es un campo obligatorio',
  }),
  nombre: Joi.string().min(2).max(60).required().messages({
    'string.base': '"nombre" debe ser un texto',
    'string.empty': '"nombre" no puede estar vacío',
    'string.min': '"nombre" debe tener al menos {#limit} caracteres',
    'string.max': '"nombre" no debe exceder {#limit} caracteres',
    'any.required': '"nombre" es un campo obligatorio',
  }),
  apellido: Joi.string().min(2).max(60).required().messages({
    'string.base': '"apellido" debe ser un texto',
    'string.empty': '"apellido" no puede estar vacío',
    'string.min': '"apellido" debe tener al menos {#limit} caracteres',
    'string.max': '"apellido" no debe exceder {#limit} caracteres',
    'any.required': '"apellido" es un campo obligatorio',
  }),
  fechaNacimiento: Joi.date().iso().less('now').required().messages({
    'date.base': '"fechaNacimiento" debe ser una fecha válida',
    'date.format': '"fechaNacimiento" debe tener formato ISO (YYYY-MM-DD)',
    'date.less': '"fechaNacimiento" no puede ser una fecha futura',
    'any.required': '"fechaNacimiento" es un campo obligatorio',
  }),
  parentesco: Joi.string().min(0).max(60).optional().allow('').messages({
    'string.base': '"parentesco" debe ser un texto',
    'string.max': '"parentesco" no debe exceder {#limit} caracteres',
  }),
  grupoFamiliarId: Joi.number().integer().positive().optional(),
  planMedicoId: Joi.number().integer().positive().optional(),
});

module.exports = createSchema;
