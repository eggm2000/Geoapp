import { Router } from 'express';
import {
  getLocalizaciones,
  getLocalizacionById,
  postLocalizacion,
  putLocalizacion,
  patchLocalizacion,
  deleteLocalizacion
} from '../controladores/LocalizacionNegocioCtrl.js'

const router = Router();

// Rutas de la API para LocalizacionNegocio

// Obtener todas las localizaciones
router.get('/localizaciones', getLocalizaciones);

// Obtener una localización por ID
router.get('/localizaciones/:id', getLocalizacionById);

// Crear una nueva localización
router.post('/localizaciones', postLocalizacion);

// Actualizar completamente una localización
router.put('/localizaciones/:id', putLocalizacion);

// Actualizar parcialmente una localización
router.patch('/localizaciones/:id', patchLocalizacion);

// Eliminar una localización
router.delete('/localizaciones/:id', deleteLocalizacion);

export default router;
