import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import Motorcycle from '../models/Motorcycle';
import MotorcycleService from '../services/MotorcycleService';

const motorcycleRoute = Router();

const model = new Motorcycle();
const service = new MotorcycleService(model);
const controller = new MotorcycleController(service);

motorcycleRoute.get('/:id', controller.readOne);

motorcycleRoute.delete('/:id', controller.delete);

motorcycleRoute.put('/:id', controller.update);

motorcycleRoute.get('/', controller.read);

motorcycleRoute.post('/', controller.create);

export default motorcycleRoute;
