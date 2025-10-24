import express from 'express';
import { withErrorHandling } from './utils';
import { prestadoresController } from '../controllers/prestadoresController';
import { noNullFields } from '../middlewares';

const router = express.Router();

// GET /
router.get('/', withErrorHandling(prestadoresController.index));

// GET /:id
router.get('/:id', withErrorHandling(prestadoresController.show));

// POST /
router.post('/', noNullFields, withErrorHandling(prestadoresController.create));

// PUT /:id
router.put(
  '/:id',
  noNullFields,
  withErrorHandling(prestadoresController.update)
);

// DELETE /:id
router.delete('/:id', withErrorHandling(prestadoresController.destroy));

export default router;
