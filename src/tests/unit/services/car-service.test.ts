import { errorCatalog } from './../../../errors/catalog';
import { ZodError } from 'zod';
import { carMock, carMockWithId, invalidCarMock } from './../../mocks/carMock';
import * as sinon from 'sinon';
import chai from 'chai';
import Car from '../../../models/Car';
import CarService from '../../../services/CarService';
import chaiAsPromised from 'chai-as-promised';
import CustomError from '../../../errors/CustomError';

const { expect } = chai;

chai.use(chaiAsPromised);

describe('Car service', () => {

  const carModel = new Car();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onFirstCall().resolves(carMockWithId)
      .onSecondCall().resolves(null);
    sinon.stub(carModel, 'delete')
      .onFirstCall().resolves(carMockWithId)
      .onSecondCall().resolves(null);
    sinon.stub(carModel, 'update')
      .onFirstCall().resolves(carMockWithId)
      .onSecondCall().resolves(null);
  });

  after(()=>{
    sinon.restore();
  });

  describe('creating a car', async () => {

    it('with valid data returns a new car', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('with invalid data throws an error', async () => {
      return expect(carService.create(invalidCarMock))
        .to.eventually.be.rejectedWith()
        .and.be.an.instanceOf(ZodError);
    });

  });

  describe('updating a car', async () => {

    it('with valid data returns a updated car', async () => {
      const updatedCar = await carService.update(carMockWithId._id, carMock);
      expect(updatedCar).to.be.deep.equal(carMockWithId);
    });

    it('with invalid data throws an error', async () => {
      return expect(carService.update(carMockWithId._id, invalidCarMock))
        .to.eventually.be.rejectedWith()
        .and.be.an.instanceOf(ZodError);
    });

    it('with invalid id throws an error', async () => {
      return expect(carService.update('teste', carMock))
        .to.eventually.be.rejectedWith(errorCatalog.InvalidMongoId.message)
        .and.be.an.instanceOf(CustomError);
    });

    it('with valid data but not exists on database throws an error', async () => {
      return expect(carService.update(carMockWithId._id, carMock))
        .to.eventually.be.rejectedWith(errorCatalog.ObjectNotFound.message)
        .and.be.an.instanceOf(CustomError);
    });

  });

  describe('delete a car', async () => {

    it('with valid id returns a removed car', async () => {
      const deletedCar = await carService.delete(carMockWithId._id);
      expect(deletedCar).to.be.deep.equal(carMockWithId);
    });

    it('with invalid id throws an error', async () => {
      return expect(carService.delete('teste'))
        .to.eventually.be.rejectedWith(errorCatalog.InvalidMongoId.message)
        .and.be.an.instanceOf(CustomError);
    });

    it('with valid id but not exists on database throws an error', async () => {
      return expect(carService.delete(carMockWithId._id))
        .to.eventually.be.rejectedWith(errorCatalog.ObjectNotFound.message)
        .and.be.an.instanceOf(CustomError);
    });

  });

  describe('search a car', async () => {

    it('with valid id returns a car', async () => {
      const car = await carService.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('with invalid id throws an error', async () => {
      return expect(carService.readOne('teste'))
        .to.eventually.be.rejectedWith(errorCatalog.InvalidMongoId.message)
        .and.be.an.instanceOf(CustomError);
    });

    it('with valid id but not exists on database throws an error', async () => {
      return expect(carService.readOne(carMockWithId._id))
        .to.eventually.be.rejectedWith(errorCatalog.ObjectNotFound.message)
        .and.be.an.instanceOf(CustomError);
    });

  });

  describe('search for all cars', async () => {

    it('return all cars', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal([carMockWithId]);
    });

  });

});