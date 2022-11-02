import { carMock, carMockWithId } from './../../mocks/carMock';
import Car from '../../../models/Car';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new Car();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOneAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findOneAndDelete').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {

    it('returns a new car', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

  });

  describe('updating a car', () => {

    it('returns the updated car', async () => {
      const updatedCar = await carModel.update(carMockWithId._id, carMock);
      expect(updatedCar).to.be.deep.equal(carMockWithId);
    });

  });

  describe('searching for all cars', () => {

    it('returns an car array', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal([carMockWithId]);
    });

  });

  describe('searching for one car', () => {

    it('returns an car', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

  });

  // describe('removing one car', () => {

  //   it('returns the removed car', async () => {
  //     const removedCar = await carModel.delete(carMockWithId._id);
  //     expect(removedCar).to.be.deep.equal(carMockWithId);
  //   });

  // });

});