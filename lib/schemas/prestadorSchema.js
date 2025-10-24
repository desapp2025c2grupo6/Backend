const Joi = require('joi');
const telefono = require('../models/telefono');
const direccion = require('../models/direccion');

const schema = Joi.object({
  nombre: Joi.string().min(3).max(30).required().messages({
    'string.base': `"nombre" debe ser un texto`,
    'string.empty': `"nombre" no puede estar vacío`,
    'string.min': `"nombre" debe tener al menos {#limit} caracteres`,
    'string.max': `"nombre" no debe exceder {#limit} caracteres`,
    'any.required': `"nombre" es un campo obligatorio`,
  }),
  apellido: Joi.string().min(3).max(30).required().messages({
    'string.base': `"apellido" debe ser un texto`,
    'string.empty': `"apellido" no puede estar vacío`,
    'string.min': `"apellido" debe tener al menos {#limit} caracteres`,
    'string.max': `"apellido" no debe exceder {#limit} caracteres`,
    'any.required': `"apellido" es un campo obligatorio`,
  }),
  CUIT: Joi.string().min(5).max(20).required().messages({
    'string.base': `"CUIT" debe ser un texto`,
    'string.empty': `"CUIT" no puede estar vacío`,
    'string.min': `"CUIT" debe tener al menos {#limit} caracteres`,
    'string.max': `"CUIT" no debe exceder {#limit} caracteres`,
    'any.required': `"CUIT" es un campo obligatorio`,
  }),
  telefono: Joi.array().items(telefono).min(1).required().messages({
    'array.base': `"telefono" debe ser un arreglo`,
    'array.min': `"telefono" debe tener al menos {#limit} elemento`,
    'any.required': `"telefono" es un campo obligatorio`,
  }),
  especialidad: Joi.string().min(3).max(50).required().messages({
    'string.base': `"especialidad" debe ser un texto`,
    'string.empty': `"especialidad" no puede estar vacío`,
    'string.min': `"especialidad" debe tener al menos {#limit} caracteres`,
    'string.max': `"especialidad" no debe exceder {#limit} caracteres`,
    'any.required': `"especialidad" es un campo obligatorio`,
  }),
  direccion: Joi.array().items(direccion).min(1).required().messages({
    'array.base': `"direccion" debe ser un arreglo`,
    'array.min': `"direccion" debe tener al menos {#limit} elemento`,
    'any.required': `"direccion" es un campo obligatorio`,
  }),
  diasAtencion: Joi.string().min(3).max(100).required().messages({
    'string.base': `"diasAtencion" debe ser un texto`,
    'string.empty': `"diasAtencion" no puede estar vacío`,
    'string.min': `"diasAtencion" debe tener al menos {#limit} caracteres`,
    'string.max': `"diasAtencion" no debe exceder {#limit} caracteres`,
    'any.required': `"diasAtencion" es un campo obligatorio`,
  }),
  horarioAtencion: Joi.string().min(3).max(100).required().messages({
    'string.base': `"horarioAtencion" debe ser un texto`,
    'string.empty': `"horarioAtencion" no puede estar vacío`,
    'string.min': `"horarioAtencion" debe tener al menos {#limit} caracteres`,
    'string.max': `"horarioAtencion" no debe exceder {#limit} caracteres`,
    'any.required': `"horarioAtencion" es un campo obligatorio`,
  }),
});
module.exports = schema;
