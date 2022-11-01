import { RequestHandler } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  _motorcycle: IService<IMotorcycle>;
  constructor(service: IService<IMotorcycle>) {
    this._motorcycle = service;
  }

  create: RequestHandler = async (req, res) => {
    const newMotorcycle = await this._motorcycle.create(req.body);
    return res.status(201).json(newMotorcycle);
  };

  update: RequestHandler = async (req, res) => {
    const updatedMotorcycle = await this._motorcycle.update(req.params.id, req.body);
    return res.status(200).json(updatedMotorcycle);
  };

  read: RequestHandler = async (_req, res) => {
    const motorcycles = await this._motorcycle.read();
    return res.status(200).json(motorcycles);
  };

  readOne: RequestHandler = async (req, res) => {
    const motorcycle = await this._motorcycle.readOne(req.params.id);
    return res.status(200).json(motorcycle);
  };

  delete: RequestHandler = async (req, res) => {
    const removedMotorcycle = await this._motorcycle.delete(req.params.id);
    return res.status(204).json(removedMotorcycle);
  };
}

export default MotorcycleController;