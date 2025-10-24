import express from 'express';
import { withErrorHandling } from './utils';
import { afiliadosController } from '../controllers';
import { afiliadoValidators, noNullFields } from '../middlewares';

const router = express.Router();

// GET /
router.get('/', withErrorHandling(afiliadosController.index));

// GET /:id
router.get(
  '/:id',
  afiliadoValidators.validateIdParam,
  withErrorHandling(afiliadosController.show)
);

// POST /
router.post(
  '/',
  afiliadoValidators.validateCreateBody,
  noNullFields,
  withErrorHandling(afiliadosController.create)
);

// PUT /:id
router.put(
  '/:id',
  afiliadoValidators.validateIdParam,
  afiliadoValidators.validateUpdateBody,
  noNullFields,
  withErrorHandling(afiliadosController.update)
);

// DELETE /:id
router.delete(
  '/:id',
  afiliadoValidators.validateIdParam,
  withErrorHandling(afiliadosController.destroy)
);

export default router;
