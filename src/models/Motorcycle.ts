import { Schema, model as mongooseCreateModel } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  buyValue: Number,
  color: String,
  model: String,
  status: Boolean,
  year: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class Motorcycle extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default Motorcycle;