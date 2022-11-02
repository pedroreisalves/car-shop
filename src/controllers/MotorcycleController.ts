import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  _motorcycle: IService<IMotorcycle>;
  constructor(service: IService<IMotorcycle>) {
    this._motorcycle = service;
  }

  create = async (req: Request, res: Response) => {
    const newMotorcycle = await this._motorcycle.create(req.body);
    return res.status(201).json(newMotorcycle);
  };

  update = async (req: Request, res: Response) => {
    const updatedMotorcycle = await this._motorcycle.update(req.params.id, req.body);
    return res.status(200).json(updatedMotorcycle);
  };

  read = async (_req: Request, res: Response) => {
    const motorcycles = await this._motorcycle.read();
    return res.status(200).json(motorcycles);
  };

  readOne = async (req: Request, res: Response) => {
    const motorcycle = await this._motorcycle.readOne(req.params.id);
    return res.status(200).json(motorcycle);
  };

  delete = async (req: Request, res: Response) => {
    const removedMotorcycle = await this._motorcycle.delete(req.params.id);
    return res.status(204).json(removedMotorcycle);
  };
}

export default MotorcycleController;