import express from 'express';
import PersonController from '../controllers/person.js';

const router = express.Router();

router.get('/', PersonController.get);
router.get('/:id', PersonController.getById);
router.post('/', PersonController.create);
router.put('/:id', PersonController.update);
router.delete('/:id', PersonController.delete);

export default router;
