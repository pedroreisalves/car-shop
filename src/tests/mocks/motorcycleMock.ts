import { IMotorcycle } from './../../interfaces/IMotorcycle';

export const motorcycleMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

export const invalidMotorcycleMock: IMotorcycle = {
  model: "",
  year: 1230,
  color: "red",
  buyValue: 0,
  category: "Street",
  engineCapacity: 125
};

export const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};