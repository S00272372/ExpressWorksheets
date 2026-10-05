import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { authenticateKey } from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import {createCarZSchema}  from '../models/cars';


const router = Router();
const carController = new CarController();


router.post('/', validate(createCarZSchema), carController.createCar);
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);
router.put('/:id', validate(createCarZSchema), carController.updateCar);
router.delete('/:id', carController.deleteCar);

export default router;                  `           `