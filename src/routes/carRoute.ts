import { Router } from 'express';
import Car from '../models/Car';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const carRoute = Router();

const model = new Car();
const service = new CarService(model);
const controller = new CarController(service);

carRoute.get('/:id', controller.readOne);

carRoute.delete('/:id', controller.delete);

carRoute.put('/:id', controller.update);

carRoute.get('/', controller.read);

carRoute.post('/', controller.create);

export default carRoute;
