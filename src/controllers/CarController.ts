import { RequestHandler } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  _car: IService<ICar>;
  constructor(service: IService<ICar>) {
    this._car = service;
  }

  create: RequestHandler = async (req, res) => {
    const newCar = await this._car.create(req.body);
    return res.status(201).json(newCar);
  };

  update: RequestHandler = async (req, res) => {
    const updatedCar = await this._car.update(req.params.id, req.body);
    return res.status(200).json(updatedCar);
  };

  read: RequestHandler = async (_req, res) => {
    const cars = await this._car.read();
    return res.status(200).json(cars);
  };

  readOne: RequestHandler = async (req, res) => {
    const car = await this._car.readOne(req.params.id);
    return res.status(200).json(car);
  };

  delete: RequestHandler = async (req, res) => {
    const removedCar = await this._car.delete(req.params.id);
    return res.status(204).json(removedCar);
  };
}

export default CarController;