import express from 'express';
import { withErrorHandling } from './utils';
import { afiliadosController } from '../controllers';
import { afiliadoValidators } from '../middlewares';

const router = express.Router();

// GET /afiliados
router.get('/afiliados', withErrorHandling(afiliadosController.index));

// GET /afiliados/:id
router.get(
  '/afiliados/:id',
  afiliadoValidators.validateIdParam,
  withErrorHandling(afiliadosController.show)
);

// POST /afiliados
router.post(
  '/afiliados',
  afiliadoValidators.validateCreateBody,
  withErrorHandling(afiliadosController.create)
);

// PUT /afiliados/:id
router.put(
  '/afiliados/:id',
  afiliadoValidators.validateIdParam,
  afiliadoValidators.validateUpdateBody,
  withErrorHandling(afiliadosController.update)
);

// DELETE /afiliados/:id
router.delete(
  '/afiliados/:id',
  afiliadoValidators.validateIdParam,
  withErrorHandling(afiliadosController.destroy)
);

export default router;
