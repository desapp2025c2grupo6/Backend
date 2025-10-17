import express from 'express';
import { withErrorHandling } from './utils';
import { afiliadosController } from '../controllers';
const router = express.Router();
router.get(
  '/afiliados/:id',
  withErrorHandling(afiliadosController.obtenerAfiliadoPorId)
);
router.get(
  '/afiliados',
  withErrorHandling(afiliadosController.obtenerAfiliados)
);
router.post('/afiliados', withErrorHandling(afiliadosController.crearAfiliado));
router.put(
  '/afiliados/:id',
  withErrorHandling(afiliadosController.actualizarAfiliado)
);
router.delete(
  '/afiliados/:id',
  withErrorHandling(afiliadosController.eliminarAfiliado)
);

export default router;
