import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  _car: IService<ICar>;
  constructor(service: IService<ICar>) {
    this._car = service;
  }

  create = async (req: Request, res: Response) => {
    const newCar = await this._car.create(req.body);
    return res.status(201).json(newCar);
  };

  update = async (req: Request, res: Response) => {
    const updatedCar = await this._car.update(req.params.id, req.body);
    return res.status(200).json(updatedCar);
  };

  read = async (_req: Request, res: Response) => {
    const cars = await this._car.read();
    return res.status(200).json(cars);
  };

  readOne = async (req: Request, res: Response) => {
    const car = await this._car.readOne(req.params.id);
    return res.status(200).json(car);
  };

  delete = async (req: Request, res: Response) => {
    const removedCar = await this._car.delete(req.params.id);
    return res.status(204).json(removedCar);
  };
}

export default CarController;